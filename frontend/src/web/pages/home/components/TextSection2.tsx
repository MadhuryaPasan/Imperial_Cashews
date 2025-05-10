import { TextReveal } from "@/components/magicui/text-reveal";

const TextSection2 = () => {
  return (
    <div className="relative">
      <TextReveal className="relative z-10">
        Ready to Taste the Difference?
      </TextReveal>
      <img
        src="https://img.freepik.com/premium-photo/beautiful-bent-cashew-nuts-fresh-raw-cashew-nuts-kitchen-table-healthy-high-calorie-raw-cashews_252085-12587.jpg?w=996"
        alt="Cashews"
        className="absolute inset-0 w-full h-full object-cover opacity-50 z-0 blur-md"
      />
    </div>
  );
};

export default TextSection2;
