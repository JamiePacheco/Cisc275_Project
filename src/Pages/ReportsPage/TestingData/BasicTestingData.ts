import { BasicQuiz } from "../../../Interfaces/BasicQuestionInterfaces/BasicQuizInterface";

export const BasicDataSetOne : BasicQuiz = {
    "dateTaken": "2024-05-15T02:07:23.151Z",
    "questionList": [
        {
            "name": "When you envision your future career– where are you?",
            "questionNumber": 1,
            "options": [
                "I am at my house in my personal home office.",
                "I am working in an office at my job location with a team of colleagues.",
                "I travel often for work, so anywhere they need me!.",
                "I am outside, out-and-about all over the city.",
                "I am in nature, appreciating its beauty."
            ],
            "answer": "I am working in an office at my job location with a team of colleagues."
        },
        {
            "name": "Which of the following career paths aligns best with your long-term goals?",
            "questionNumber": 2,
            "options": [
                "Pursuing opportunities for leadership and management roles.",
                "Specializing in a specific field or area of expertise.",
                "Contributing to meaningful social or environmental causes.",
                "Contributing to academic research or independent study.",
                "One where you make a lot of money!!!!!"
            ],
            "answer": "One where you make a lot of money!!!!!"
        },
        {
            "name": "I am a…",
            "questionNumber": 3,
            "options": [
                "People person: I enjoy socializing and working with others.",
                "Logical person: I enjoy coming up with new ideas and solutions to real world problems",
                "Creative person: I enjoy making art, coming up with ideas, and am comfortable with ambiguity.",
                "Adventurous person: I seek excitement and challenge in my work, I am open to exploring opportunities and experiences.",
                "Compassionate person: I am driven by a desire to help others and make a positive impact on the world around me."
            ],
            "answer": "Adventurous person: I seek excitement and challenge in my work, I am open to exploring opportunities and experiences."
        },
        {
            "name": "What kinds of environments do you thrive in professionally?",
            "questionNumber": 4,
            "options": [
                "Dynamic, fast paced environments.",
                "Supportive and nurturing.",
                "Structured and methodical.",
                "Free and unconstrained envrironments.",
                "A little bit of everything!"
            ],
            "answer": "Free and unconstrained envrironments."
        },
        {
            "name": "What kind of work environment do you envision for yourself?",
            "questionNumber": 5,
            "options": [
                "A fast-paced startup or an entrepreneurial setting.",
                "A well established and reputable organization.",
                "A dynamic and collaborative team-based environment.",
                "A collegial space where everyone knows everyone.",
                "A space where I am independent and free to do what I want."
            ],
            "answer": "A well established and reputable organization."
        },
        {
            "name": "What kind of tasks do you find most fulfilling?",
            "questionNumber": 6,
            "options": [
                "Creating something new from scratch.",
                "Working with people (clients, general public, etc) and assisting them with issues.",
                "Organizing and optimizing processes.",
                "Working to understand a concept or learn something new",
                "Interacting with nature in some way."
            ],
            "answer": "Working with people (clients, general public, etc) and assisting them with issues."
        },
        {
            "name": "What aspect of work excites you the most?",
            "questionNumber": 7,
            "options": [
                "Creativity and innovation.",
                "Helping and supporting others.",
                "Analyzing data and solving complex problems.",
                "MONEYYYYYYY.",
                "Making the world a better place."
            ],
            "answer": "Helping and supporting others."
        },
        {
            "name": "For your job, would you prefer physical labor, mental labor, or a mix of both?",
            "questionNumber": 8,
            "options": [
                "Physical: I like to get my hands dirty and work with things directly.",
                "Mental: I enjoy solving problems, working at a task where I need to utilize mental skills.",
                "Both: I enjoy manual labor and jobs that require me to think!"
            ],
            "answer": "Physical: I like to get my hands dirty and work with things directly."
        },
        {
            "name": "Do you like bears?",
            "questionNumber": 9,
            "options": [
                "Bear-y much",
                "Yes",
                "Meh",
                "Not Really",
                "I hate them"
            ],
            "answer": "Bear-y much"
        }
    ],
    "numAnswered": 0,
    "currentQuestion": 1,
    "displayOrder": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
    ],
    "basicQuizResults": {
        "personalityTraits": [
            {
                "trait": "Team-Oriented",
                "traitDescription": "You thrive in collaborative environments where you can work closely with colleagues.",
                "traitLogic": "Your response about envisioning your future career with a team of colleagues in an office suggests you value teamwork."
            },
            {
                "trait": "Adventurous",
                "traitDescription": "You seek excitement and challenge in your work and are open to exploring new opportunities and experiences.",
                "traitLogic": "Describing yourself as an adventurous person indicates a preference for dynamic and challenging work environments."
            },
            {
                "trait": "Supportive",
                "traitDescription": "You find fulfillment in helping and supporting others, whether it's clients or the general public.",
                "traitLogic": "Your answers emphasizing working with people, assisting them with issues, and supporting others highlight your supportive nature."
            }
        ],
        "careerFieldSuggestions": [
            {
                "careerField": "Healthcare",
                "careerFieldDescription": "This field involves providing medical services, support, and care to individuals in need. It includes a range of roles from direct patient care to support services.",
                "careerFieldLogic": "Your supportive nature and interest in helping others align well with roles in healthcare where support and care for others are paramount.",
                "careerFieldJobs": [
                    "Nurse",
                    "Physical Therapist",
                    "Medical Social Worker"
                ]
            },
            {
                "careerField": "Social Services",
                "careerFieldDescription": "This field focuses on assisting individuals and communities to improve their well-being through support, resources, and advocacy.",
                "careerFieldLogic": "Your inclination towards working with people and assisting them with issues suits professions within social services where helping others is central.",
                "careerFieldJobs": [
                    "Social Worker",
                    "Counselor",
                    "Community Service Manager"
                ]
            },
            {
                "careerField": "Corporate Training and Development",
                "careerFieldDescription": "This field involves designing and conducting training programs to improve employee skills and organizational performance.",
                "careerFieldLogic": "Your desire to work in a well-established organization and support people aligns with roles in corporate training where your aim is to help others develop and succeed.",
                "careerFieldJobs": [
                    "Corporate Trainer",
                    "Learning and Development Specialist",
                    "Human Resources Manager"
                ]
            }
        ]
    }
}