const Hero = ({ headline, tagline }) => (
  <div className="text-center space-y-2">
    <h1 className="text-3xl font-bold">{headline}</h1>
    <p className="text-lg text-gray-600">{tagline}</p>
  </div>
)

export default Hero
