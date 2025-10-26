import { motion } from 'framer-motion';
import { StatCard } from './statCard';


const DashboardStats = ({stats}) => {
  return (
     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
            <StatCard {...stat}/> 
            </motion.div>
          ))}
        </div>
  )
}

export default DashboardStats