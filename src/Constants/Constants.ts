import { LucideBookCopy, LucideComputer, LucideUserCircle } from "lucide-react"
import { title } from "process"

export const navLinks = [
    {
        link: "/",
        name: "Home"
    },
    {
        link: "/about",
        name: "About"
    },
    {
        link: "/help",
        name: "Support & Faq"
    },
    {
        link: "/subscription",
        name: "Subscription"
    },
   
]

export const CountSection = [
    {
        count: 1000,
        title: "Active Learning Users",
        icon: LucideUserCircle
    },
    {
        count: 200,
        title: "Total Learning Materail",
        icon: LucideBookCopy
    },
    {
        count: 20,
        title: "Sponsored Company",
        icon: LucideComputer
    }
]

export const QuizCardData = [
    {
        id: 1,
        subject: "Science",
        title: "Science Debate Quiz",
        description: "Test your knowledge of science with this Debate quiz.",
        numberOfQuestions: 10,
        timeLimit: 15,
        color: "#AFDDE5", // Example color
    },
    {
        id: 2,
        subject: "History",
        title: "History Debate Quiz",
        description: "Explore historical events and figures in this Debate quiz.",
        numberOfQuestions: 10,
        timeLimit: 15,
        color: "#748D92", // Example color
    },
    {
        id: 3,
        subject: "Politics",
        title: "Politics Debate Quiz",
        description: "Challenge your Politics skills with this Debate quiz.",
        numberOfQuestions: 10,
        timeLimit: 15,
        color: "#D3D9D4", // Example color
    }
]