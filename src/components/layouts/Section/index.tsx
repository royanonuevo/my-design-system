type SectionProps = {
  children: React.ReactNode,
  className?: string
}

const Section = ({
  children,
  className = ''
}: SectionProps) => {
  return (
    <section className={`bg-gray-900 p-5 mb-5 ${className}`}>
      { children }
    </section>
  )
}

export default Section