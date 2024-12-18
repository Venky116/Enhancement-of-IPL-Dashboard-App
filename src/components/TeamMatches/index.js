import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {teamData: {}, isLoading: true}

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/ipl/${id}`

    const response = await fetch(apiUrl)
    const data = await response.json()

    const updatedTeamData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: {
        umpires: data.latest_match_details.umpires,
        result: data.latest_match_details.result,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
      },
      recentMatches: data.recent_matches.map(match => ({
        umpires: match.umpires,
        result: match.result,
        manOfTheMatch: match.man_of_the_match,
        id: match.id,
        date: match.date,
        venue: match.venue,
        competingTeam: match.competing_team,
        competingTeamLogo: match.competing_team_logo,
        firstInnings: match.first_innings,
        secondInnings: match.second_innings,
        matchStatus: match.match_status,
      })),
    }

    this.setState({teamData: updatedTeamData, isLoading: false})
  }

  renderLatestMatchDetails = () => {
    const {teamData} = this.state
    const {latestMatchDetails} = teamData

    return <LatestMatch latestMatchDetails={latestMatchDetails} />
  }

  renderRecentMatchesList = () => {
    const {teamData} = this.state
    const {recentMatches} = teamData

    return (
      <ul className="recent-matches-list">
        {recentMatches.map(match => (
          <MatchCard key={match.id} matchData={match} />
        ))}
      </ul>
    )
  }

  render() {
    const {teamData, isLoading} = this.state
    const {teamBannerUrl} = teamData

    return (
      <div className="team-matches-container">
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <>
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-banner"
            />
            {this.renderLatestMatchDetails()}
            {this.renderRecentMatchesList()}
          </>
        )}
      </div>
    )
  }
}

export default TeamMatches
