"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
import Image from "next/image";

const cardData = [
  {
    label: "I want to travel to",
    key: "country",
    default: "Country",
    options: [
      "Europe",
      "Japan",
      "Korea",
      "Malaysia",
      "Southeast Asia",
      "Thailand",
    ],
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "I want to experience",
    key: "activity",
    default: "Activity",
    options: ["Adventure", "Culture", "Food", "Nature", "Relaxation"],
    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "I am going",
    key: "group",
    default: "Group",
    options: ["Solo", "With My Partner", "With My Family", "With My Friends"],
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "My budget is",
    key: "budget",
    default: "Budget",
    options: [
      "$500 - $1000",
      "$1000 - $5000",
      "$5000 - $10,000",
      "$10,000 +",
      "Flexible",
    ],
    img: "https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=800&q=80",
  },
];

function SelectionModal({
  open,
  onClose,
  options,
  label,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  options: string[];
  label: string;
  onSelect: (val: string) => void;
}) {
  const [visible, setVisible] = useState(open);
  const [render, setRender] = useState(open);

  useEffect(() => {
    if (open) {
      setRender(true);
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
      setTimeout(() => setRender(false), 200);
    }
  }, [open]);

  if (!render) return null;

  // Modal background: #1C1F24
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 dark:bg-black/80 transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div className="absolute inset-0" />
      <div
        className={`relative z-10 w-full max-w-2xl mx-auto bg-white dark:bg-[#1C1F24] rounded-lg p-8 transition-all duration-200 ${
          visible ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-6 right-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-3xl"
          onClick={onClose}
        >
          <X size={32} />
        </button>
        <div className="text-center text-gray-700 dark:text-gray-300 text-lg mb-8">
          {label}
        </div>
        <div className="flex flex-col divide-y divide-gray-200 dark:divide-[#393942]">
          {options.map((opt) => (
            <button
              key={opt}
              className="flex items-center justify-between px-8 py-6 text-2xl font-normal rounded-none transition-all duration-150 hover:bg-gray-200 dark:hover:bg-[#393942] hover:text-gray-900 dark:hover:text-white text-gray-700 dark:text-gray-100 group"
              style={{ fontWeight: 400 }}
              onClick={() => {
                onSelect(opt);
                onClose();
              }}
            >
              <span>{opt}</span>
              <span className="relative flex items-center">
                <ArrowRight className="opacity-60 transition-all duration-200 group-hover:translate-x-2" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SelectionCard({
  label,
  highlight,
  img,
  onClick,
}: {
  label: string;
  highlight: string;
  img: string;
  onClick: () => void;
}) {
  return (
    <div
      className="relative h-64 flex items-end justify-start overflow-hidden rounded-lg shadow-lg group cursor-pointer"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-black/75 group-hover:bg-black/30 transition-all duration-300" />
      <div className="relative z-10 p-6 w-full">
        <p className="text-white text-lg">{label}</p>
        <span className="block text-3xl font-bold text-yellow-200">
          {highlight}
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  const [selected, setSelected] = useState({
    country: "Country",
    activity: "Activity",
    group: "Group",
    budget: "Budget",
  });
  const [modal, setModal] = useState<null | keyof typeof selected>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    setIsFormValid(
      selected.country !== "Country" &&
        selected.activity !== "Activity" &&
        selected.group !== "Group" &&
        selected.budget !== "Budget" &&
        email !== ""
    );
  }, [selected, email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      console.log({
        country: selected.country,
        activity: selected.activity,
        group: selected.group,
        budget: selected.budget,
        email,
      });
      router.push("/coming");
    }
  };

  const Card = ({
    picture,
    title,
    description,
  }: {
    picture: React.ReactNode;
    title: string;
    description: string;
  }) => {
    return (
      <div className="flex flex-col items-center text-center p-6">
        <div className="w-100 h-80 rounded-full flex items-center justify-center mb-2">
          {picture}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 w-full flex flex-col items-center px-8">
        <div className="w-full max-w-7xl mx-auto">
          {/* Navigation Bar */}
          <nav className="py-6 flex justify-between items-center">
            <p>Away</p>
            <ModeToggle />
          </nav>

          <h1 className="text-center text-3xl sm:text-5xl my-8 sm:mt-16">
            Your Mystery Adventure Awaits
          </h1>
          <h2 className="text-center text-xl text-gray-500 mb-8">
            Select your travel preferences
          </h2>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-16">
            {cardData.map((card, idx) => (
              <SelectionCard
                key={idx}
                label={card.label}
                highlight={
                  selected[card.key as keyof typeof selected] || card.default
                }
                img={card.img}
                onClick={() => setModal(card.key as keyof typeof selected)}
              />
            ))}
          </div>

          {/* Modals */}
          {cardData.map((card) => (
            <SelectionModal
              key={card.key}
              open={modal === card.key}
              onClose={() => setModal(null)}
              options={card.options}
              label={card.label}
              onSelect={(val) =>
                setSelected((sel) => ({ ...sel, [card.key]: val }))
              }
            />
          ))}

          {/* Title and form */}
          <section className="flex flex-col items-center">
            {/* Email Input and CTA */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center space-y-6 w-full max-w-xs"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="max-w-7xl h-10"
              />

              <Button
                type="submit"
                disabled={!isFormValid}
                className={`rounded-[50%] h-32 w-32 mt-6 font-medium transition-all duration-500 ${
                  isFormValid
                    ? "hover:scale-110 cursor-pointer"
                    : "bg-gray-300 text-gray-500 dark:bg-transparent dark:border-2 dark:text-gray-500 cursor-not-allowed"
                }`}
              >
                Surprise Me
              </Button>
            </form>
          </section>

          {/* Divider */}
          <div className="w-16 h-[2px] bg-gray-600 mx-auto my-16"></div>

          {/* How it works section */}
          <section className="flex flex-col items-center">
            <h2 className="text-lg tracking-[1px] uppercase font-semibold">
              How It Works
            </h2>
            <h2 className="text-4xl mt-4 mb-18">Leave the planning to us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full">
              <Card
                picture={
                  <div className="w-100 h-80 mb-8 relative">
                    <Image
                      src="/1.png"
                      alt="Share Preferences"
                      fill
                      className="object-cover rounded-md"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                }
                title="Share Your Preferences"
                description="Tell us your travel preferences, availability, interests, budget, and any other must-haves to help us craft your perfect trip"
              />
              <Card
                picture={
                  <div className="w-100 h-80 mb-8 relative">
                    <Image
                      src="/2.jpg"
                      alt="Collect Travel Package"
                      fill
                      className="object-cover rounded-md"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                }
                title="Collect Your Travel Package"
                description="Collect your personalized travel package at the airport, containing details of your mystery destination and itinerary"
              />
              <Card
                picture={
                  <div className="w-100 h-80 mb-8 relative">
                    <Image
                      src="/3.jpg"
                      alt="Begin Adventure"
                      fill
                      className="object-cover rounded-md"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                }
                title="Begin Your Adventure"
                description="Embark on the journey to your mystery destination and let the adventure unfold, backed by our 24/7 support team"
              />
            </div>
          </section>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="w-full mt-16 p-4">
        <div className="max-w-7xl mx-auto px-8">
          <div className="h-[1px] bg-gray-600"></div>
          <div className="flex justify-end mt-4 items-center align-middle">
            <p className="">© 2025 - Away</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
