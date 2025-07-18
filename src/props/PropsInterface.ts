export interface quizInterface{
    id: string;
    title: string;
    explanation: string;
    level: string
    quizId: string
}

export interface quizDataInterface {
    id: string;
    title: string;
    explanation: string;
    level: string;
    options: [],
    question: string;
    correct_answer?: string;
}

export interface quizQuestionInterface {
    quizData: quizDataInterface[];
    selectedQuestionId?: string | null;
    answers: { [key: string]: string };
    handleQuestionSelect?: (id: string) => void;
    handleOptionSelect?: (questionId: string, option: string) => void;
    handleSubmit?: () => void;
}

export interface quizProgressInterface {
    answeredQuestion: number;
    totalQuestion: number;
    progressPercentage: number;
}

export interface quizResultDataInterface {
    id: string;
    score: number;
    correct_answers: number,
    wrong_answers: number,
    percentage: number,
    answer?: { [key: string]: string };
    results: {[key: string]: boolean}
    total_marks: number
}
export interface quizResultInterface {
    username: string;
    title: string;
    level: string
}

  export interface ClerkUser{
    clerk_id?: string;
    username?: string;
    email?: string;
    password?: string;
    imageUrl?: string;
};
  
export interface Dashprofile{
    userValue: ClerkUser | undefined;
    itemVariants: {
        hidden: { y: number; opacity: number }
        visible: { y: number; opacity: number; transition: { duration: number; type: string } }
    }
}

export interface dashboardBadges{
    itemVariants: {
        hidden: { y: number; opacity: number }
        visible: { y: number; opacity: number; transition: { duration: number; type: string } }
    }
}

export interface takenQuiz {
    title: string,
    level: string,
    score: 3,
    quizId: string
}

export interface propquiz{
    takenquiz: takenQuiz[]
}

export interface profiledisplayquiz{
    percentage: number,
    taken_quiz: number,
    total_score: number
}

export interface bookmarkedQuiz{
    title: string,
    level: string,
    quizId: string
}

export interface levelProps{
    Level: number,
    Exp: number,
    Badges?: []
}

export interface aigeneratedprop{
    generatedQuizData: quizInterface[]
}