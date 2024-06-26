import { DetailedQuiz } from "../../../Interfaces/QuizInterfaces/DetailedQuestionInterfaces/DetailedQuiz"

//data to be used for testing of reports/user storage services/users page

//JSON.parse(DataSetOne) will turn this into an object
export const DataSetOne : DetailedQuiz = {
    "bearClicked" : 10,
    "dateTaken" : new Date().toISOString(),
    "interactions": [
      {
        "position" : 1,
        "careerBearPrompt": {
          "prompt": "Hello Jamie! I'm Career Bear, and I'm here to help you paw-sibly find the best fit for your career path. Let's get started! To get to know you a little bear-ter, could you tell me about some of your hobbies or activities you enjoy? 🐻"
        },
        "userResponse": {
          "response": "I really enjoy reading"
        }
      },
      {
        "position" : 2,
        "careerBearPrompt": {
          "prompt": "That's wonderful! Reading can open up so many worlds. What types of books do you usually enjoy reading?"
        },
        "userResponse": {
          "response": "I have been really enjoying philosophy books"
        }
      },
      {
        "position" : 3,
        "careerBearPrompt": {
          "prompt": "That's paw-some! Philosophy can open up new ways of thinking about the world. What's the last philosophy book you read, and what did you find most intriguing about it?"
        },
        "userResponse": {
          "response": "I read Meditations and other metaphysical writings by Immanuel Kant. Overall his ideas were amazing and really fascinating "
        }
      },
      {
        "position" : 4,
        "careerBearPrompt": {
          "prompt": "It's wonderful to hear you enjoyed Kant's writings—his ideas really make us think deeply about our understanding of the world and morality. Speaking of deep thoughts, if you were a philosopher, what philosophical question would you ponder the most? Maybe something like, \"What if teddy bears ruled the world?\" 🐻 Let's have some fun thinking about it!"
        },
        "userResponse": {
          "response": "Maybe questions related to technology, like if AI can be considered conscious "
        }
      }
    ],
    "results": {
      "personalityTraits": [
        {
          "trait": "Intellectual",
          "traitDescription": "Enjoys engaging with complex ideas and deep thinking.",
          "traitLogic": "The user's interest in philosophy books like Kant's 'Meditations' shows an inclination towards intellectual pursuits and abstract thinking."
        },
        {
          "trait": "Curious",
          "traitDescription": "Has a strong desire to learn and understand new concepts.",
          "traitLogic": "The user's choice of reading, particularly in philosophy, indicates a curiosity about the world and its underlying principles."
        },
        {
          "trait": "Analytical",
          "traitDescription": "Able to dissect problems and inquire deeply into topics.",
          "traitLogic": "The user's engagement with metaphysical writings and complex philosophical questions showcases an analytical approach to thinking."
        },
        {
          "trait": "Futuristic",
          "traitDescription": "Thinks about future scenarios and implications, particularly about technology.",
          "traitLogic": "Pondering on futuristic and technological issues like the consciousness of AI, the user shows an ability to consider advanced and upcoming trends."
        },
        {
          "trait": "Creative",
          "traitDescription": "Ability to think outside the box and imagine possibilities, including unconventional scenarios.",
          "traitLogic": "Asking imaginative questions about alternate realities, such as a world ruled by teddy bears, demonstrates a creative mindset."
        }
      ],
      "careerSuggestions": [
        {
          "career": "Philosophy Professor",
          "careerDescription": "Teaches philosophy at a collegiate level, engaging students in discussions and guiding them through complex philosophical theories and ideas.",
          "careerLogic" : ""
        },
        {
          "career": "Ethics Compliance Officer",
          "careerDescription": "Works within organizations to ensure policies and practices adhere to ethical standards, including the emerging dilemmas around tech and AI.",
          "careerLogic" : ""
        },
        {
          "career": "Futurist",
          "careerDescription": "Analyzes trends and predicts future changes affecting society and technology. Involves interdisciplinary research and the development of strategic plans for long-term advancements.",
          "careerLogic" : ""
        }
      ]
    }
}

export const DataSetTwo : DetailedQuiz = {
  "bearClicked" : 10,
  "dateTaken" : new Date().toISOString(),
  "interactions": [
      {
        "position" : 1,
          "careerBearPrompt": {
              "prompt": "Hello Jamie! I’m Career Bear, here to help you paw through the possibilities 🐾 of your future career. To get started, could you tell me what hobbies or activities you enjoy in your spare time?"
          },
          "userResponse": {
              "response": "I like to code"
          }
      },
      {
        "position" : 2,
          "careerBearPrompt": {
              "prompt": "That's pawsome! Coding is a great skill to have. What programming languages do you enjoy using, or are you looking to learn any new ones soon? 🐻💻"
          },
          "userResponse": {
              "response": "I really like Java and Typescript but I want to start learning C++"
          }
      },
      {
        "position" : 3,
          "careerBearPrompt": {
              "prompt": "That's pawsome! Java and TypeScript are great languages, and diving into C++ will definitely help broaden your programming skills. C++ is known for its performance and control over system resources, making it ideal for software that requires high performance like games, real-time systems, and applications that need direct interaction with hardware.\n\nGiven that you like both Java and TypeScript, you might appreciate the object-oriented features of C++, as well as the power it gives you to manage memory manually. Just a heads-up, C++ can be a bit more complex due to its features like pointers and manual memory management, but don't worry! Once you get the hang of it, you'll be clawing through the code like a pro!\n\nIf you're ready to start, I'd suggest beginning with the basics of syntax and gradually moving to more advanced topics like data structures, pointers, and object-oriented programming in C++. It's also a good idea to implement some small projects or contribute to open source to get practical experience.\n\nNow, for a little fun—would you rather write a program that helps track salmon migrations or one that calculates the optimal amount of honey a bear needs per day? 🐻"
          },
          "userResponse": {
              "response": "Well I think I would rather write a program to track salmon migrations because it would probably help you out"
          }
      },
      {
        "position" : 4,
          "careerBearPrompt": {
              "prompt": "That sounds like a fin-tastic idea! Tracking salmon migrations could indeed provide valuable data for conservation efforts and fisheries management. What sparked your interest in salmon migrations?"
          },
          "userResponse": {
              "response": "Well I think that it would help you out since you're a bear and all"
          }
      },
      {
        "position" : 5,
          "careerBearPrompt": {
              "prompt": "Oh, I think there might have been a little mix-up in our conversation, but no worries! Since I'm here to help you uncover your career path, let's talk about your interests. Would you rather explore a career that involves working outdoors or one that focuses on indoor activities? 🌲 vs. 🏢 What suits your fur-tastic style more?"
          },
          "userResponse": {
              "response": "Well I think that it would help you out since you're a bear and all"
          }
      }
  ],
  "results": {
      "personalityTraits": [
          {
              "trait": "Inquisitive",
              "traitDescription": "Curious and eager to learn new things and understand how they work.",
              "traitLogic": "Exhibited by the user's interest in learning C++ to enhance their programming skills and existing knowledge in Java and TypeScript."
          },
          {
              "trait": "Problem Solver",
              "traitDescription": "Able to think critically and solve complex problems, often through innovative approaches.",
              "traitLogic": "Inferred from the user's interest in coding and tackling new programming challenges, suggesting a strong ability to solve technical problems."
          },
          {
              "trait": "Eco-conscious",
              "traitDescription": "Shows consideration for the environment and interest in conservational activities.",
              "traitLogic": "Deduced from the user's choice of developing a project to track salmon migrations, which could aid in conservation efforts."
          },
          {
              "trait": "Practical",
              "traitDescription": "Focuses on real-world applications of skills and knowledge to make tangible impacts.",
              "traitLogic": "Shown by choosing a project that would provide practical benefits to conservation, aligning personal skills with practical outcomes."
          },
          {
              "trait": "Empathetic",
              "traitDescription": "Ability to understand and share the feelings of others, often leading to altruistic actions.",
              "traitLogic": "Implied by the user's humorous extrapolation that a salmon migration tracking app would help bears, indicating a playful empathy towards animal characters and their challenges."
          }
      ],
      "careerSuggestions": [
          {
              "career": "Software Developer",
              "careerDescription": "Designs, codes, and modifies software applications to suit the needs of users. Software developers can specialize in various coding languages and may work on diverse projects including environmental and scientific applications."
              ,"careerLogic" : ""
            },  
          {
              "career": "Environmental Data Analyst",
              "careerDescription": "Utilizes technical and analytical skills to assess environmental data and provide insights for conservation efforts, policy making, and resource management. This role would blend coding skills with a commitment to ecological stewardship."
              ,"careerLogic" : ""
            },
          {
              "career": "Conservation Technology Specialist",
              "careerDescription": "Combines technology and environmental science to develop tools and technologies to aid in conservation and natural resource management. This can include software for tracking animal migrations, analyzing habitat data, and other applications to support ecological goals."
              ,"careerLogic" : ""
            }
      ]
  }
}

// const DataSetThree : DetailedQuiz = {
//   "dateTaken" : new Date().toISOString(),
//   "interactions": [
//       {
//           "careerBearPrompt": {
//               "prompt": "Hello there! I'm Career Bear, your friendly career guide with a passion for helping you find the perfect job. Let's start off with a simple question: What's your name? 🐻"
//           },
//           "userResponse": {
//               "response": "Jamie"
//           }
//       },
//       {
//           "careerBearPrompt": {
//               "prompt": "Hello Jamie! It's great to meet you. Let's kick off our adventure with a fun question: If you could have any superpower while at work, would you rather have the ability to fly or be invisible? 🦸‍♂️🐾"
//           },
//           "userResponse": {
//               "response": "fly cause I could then avoid 5 o clock traffic"
//           }
//       },
//       {
//           "careerBearPrompt": {
//               "prompt": "That's a pawsitively great choice, Jamie! Flying would definitely be a bear-rilliant way to beat the traffic and get to meetings on time, especially in big cities. Speaking of cities, if you could work in any city in the world, which one would be your top pick and why? 🌍✈️"
//           },
//           "userResponse": {
//               "response": "tokyo because the culture, city, and overall aesthetic is very nice"
//           }
//       },
//       {
//           "careerBearPrompt": {
//               "prompt": "Tokyo does have a fascinating blend of traditional and modern influences, making it a vibrant place to explore, both culturally and aesthetically. Are you thinking about visiting Tokyo, or is there something specific about the city's culture or aesthetics that you find particularly inspiring or relevant to your interests or career goals? 🌆🍣"
//           },
//           "userResponse": {
//               "response": "I find the way they implement technology in their daily lives and within the city to be really fascinating "
//           }
//       }
//   ],
//   "results": {
//       "personalityTraits": [
//           {
//               "trait": "Innovative",
//               "traitDescription": "Being able to find creative and effective solutions or ideas that are not usually obvious.",
//               "traitLogic": "Jamie's fascination with Tokyo's integration of technology in daily life suggests a keen interest in innovative practices and modern solutions."
//           },
//           {
//               "trait": "Adventurous",
//               "traitDescription": "Eager to try new things and embrace new experiences.",
//               "traitLogic": "Choosing Tokyo, a city known for its vibrant blend of traditional and modern elements, indicates a desire to explore and experience diverse environments."
//           },
//           {
//               "trait": "Problem Solver",
//               "traitDescription": "Ability to identify, assess, and solve problems quickly and effectively.",
//               "traitLogic": "Preferring to fly to avoid traffic demonstrates a practical approach to solving issues related to inefficiency and time management."
//           },
//           {
//               "trait": "Tech-Savvy",
//               "traitDescription": "Highly skilled or knowledgeable in the use of technology.",
//               "traitLogic": "Jamie's appreciation for technological integration into city life suggests a strong competency and interest in technological advancements."
//           },
//           {
//               "trait": "Culturally Aware",
//               "traitDescription": "Having an understanding and appreciation of different cultures and practices.",
//               "traitLogic": "The choice of Tokyo due to its cultural and aesthetic qualities highlights a sensitivity and openness to diverse cultural experiences."
//           }
//       ],
//       "careerSuggestions": [
//           {
//               "career": "Urban Planner",
//               "careerDescription": "Urban planners develop plans and programs for the use of land to create communities, accommodate growth, and revitalize physical facilities in towns, cities, counties, and metropolitan areas. They often need a good understanding of both modern and traditional influences, particularly in city aesthetics and infrastructure."
//           },
//           {
//               "career": "Technology Consultant",
//               "careerDescription": "Technology consultants help businesses implement technology solutions in a cost-effective way by determining the requirements of a project or program, and communicating them clearly to stakeholders, facilitators and partners. They stay abreast of technological developments and how they can be utilized to improve business efficiency and productivity."
//           },
//           {
//               "career": "Cultural Liaison",
//               "careerDescription": "Cultural liaisons work to build bridges between different cultures, often within an international business or diplomatic context. This job requires a deep understanding of different cultures, and the ability to effectively communicate and negotiate across cultural boundaries, often enhancing cooperation in multicultural settings."
//           }
//       ]
//   }
// }