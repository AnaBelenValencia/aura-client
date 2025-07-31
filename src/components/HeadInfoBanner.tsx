import auraHero from '../assets/Hero.png'

export function HeadInfoBanner() {
  // TODO : Add real buttons and info, replace the Hero img for real component content
  return (
    <div className="w-full h-[40vh] bg-[#1B093C] flex text-white">
      <img src={auraHero} alt="Aura Hero" className="w-full" />
    </div>
  )
}