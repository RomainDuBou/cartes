import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import { useGame } from '../../context/GameContext'
import { getPlayerTitle, calculatePlayerStats, calculateMaxStreak } from '../../utils/helpers'

export function Leaderboard() {
  const { players, games } = useGame()

  // Calculer les stats de chaque joueur
  const playerStats = players.map(player => {
    const { wins, gamesPlayed, winRate } = calculatePlayerStats(player.id, games)
    const { maxStreak } = calculateMaxStreak(player.id, games)
    
    return {
      ...player,
      wins,
      gamesPlayed,
      winRate,
      maxStreak,
    }
  }).sort((a, b) => b.wins - a.wins)

  const getRankBadge = (rank) => {
    if (rank === 1) return { class: 'rank-1', emoji: '🥇' }
    if (rank === 2) return { class: 'rank-2', emoji: '🥈' }
    if (rank === 3) return { class: 'rank-3', emoji: '🥉' }
    return { class: 'bg-white/5 text-white/50', emoji: null }
  }

  return (
    <motion.div 
      className="leaderboard-table"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/5">
            <th className="px-6 py-4 text-left text-[11px] font-bold text-white/30 uppercase tracking-wider w-20">
              Rang
            </th>
            <th className="px-6 py-4 text-left text-[11px] font-bold text-white/30 uppercase tracking-wider">
              Joueur
            </th>
            <th className="px-6 py-4 text-center text-[11px] font-bold text-white/30 uppercase tracking-wider w-28">
              Victoires
            </th>
            <th className="px-6 py-4 text-center text-[11px] font-bold text-white/30 uppercase tracking-wider w-24 hidden md:table-cell">
              Taux
            </th>
            <th className="px-6 py-4 text-center text-[11px] font-bold text-white/30 uppercase tracking-wider w-28 hidden md:table-cell">
              Série Max
            </th>
            <th className="px-6 py-4 text-center text-[11px] font-bold text-white/30 uppercase tracking-wider w-24">
              Profil
            </th>
          </tr>
        </thead>
        <tbody>
          {playerStats.map((player, idx) => {
            const rank = idx + 1
            const badge = getRankBadge(rank)
            
            return (
              <motion.tr 
                key={player.id}
                className="table-row group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.03)' }}
              >
                <td className="px-6 py-4">
                  <motion.div 
                    className={`rank-badge ${badge.class}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {badge.emoji || rank}
                  </motion.div>
                </td>
                <td className="px-6 py-4">
                  <Link to={`/players/${player.id}`} className="flex items-center gap-4 group/link">
                    <motion.div 
                      className="avatar-3d w-12 h-12 text-2xl"
                      whileHover={{ scale: 1.15 }}
                    >
                      {player.emoji || '🃏'}
                    </motion.div>
                    <div>
                      <div className="font-semibold text-white group-hover/link:text-gold transition-colors">
                        {player.name}
                      </div>
                      <div className="text-xs text-white/30">
                        {getPlayerTitle(player.wins)}
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4 text-center">
                  <motion.span 
                    className="font-display text-2xl font-bold bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.2 }}
                  >
                    {player.wins}
                  </motion.span>
                </td>
                <td className="px-6 py-4 text-center hidden md:table-cell">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/5 text-white/70">
                    {player.winRate}%
                  </span>
                </td>
                <td className="px-6 py-4 text-center hidden md:table-cell">
                  <span className="text-orange-400 font-medium flex items-center justify-center gap-1">
                    <span className="text-lg">🔥</span> {player.maxStreak}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <Link to={`/players/${player.id}`}>
                    <motion.button 
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold/10 border border-gold/20 text-gold text-sm hover:bg-gold/20 hover:border-gold/40 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Voir</span>
                    </motion.button>
                  </Link>
                </td>
              </motion.tr>
            )
          })}
          {playerStats.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-16 text-center text-white/30">
                <div className="text-4xl mb-2">👥</div>
                Aucun joueur enregistré
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </motion.div>
  )
}
