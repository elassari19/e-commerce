import { motion } from "framer-motion"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const MotionScale = ({ children }: Props) => {
  // const animate = left ? 
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
          type: "spring",
        }
      }}
    >
      {children}
    </motion.div>
  )
}

export default MotionScale
