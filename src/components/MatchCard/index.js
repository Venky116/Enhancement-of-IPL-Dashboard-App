import './index.css'

const MatchCard = props => {
  const {matchData} = props
  const {competingTeam, competingTeamLogo, result, matchStatus} = matchData

  const matchStatusClassName =
    matchStatus === 'Won' ? 'match-won' : 'match-lost'

  return (
    <li className="match-card">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="team-logo"
      />
      <p>{competingTeam}</p>
      <p>{result}</p>
      <p className={matchStatusClassName}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
