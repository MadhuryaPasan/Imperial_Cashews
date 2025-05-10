import { TextReveal } from "@/components/magicui/text-reveal";

const TextSection1 = () => {
  return (
    <div className="relative">
      <TextReveal className="relative z-10">
        High-quality Sri Lankan cashew nuts – pure, tasty, and natural.
      </TextReveal>
      <img
        src="https://img.freepik.com/premium-photo/cashews-wooden-spoon-white-view-from-top_269543-1720.jpg?w=740"
        alt="Cashews"
        className="absolute inset-0 w-full h-full object-cover opacity-50 z-0 blur-md"
      />
    </div>
  )
}

export default TextSection1