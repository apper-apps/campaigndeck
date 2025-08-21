// Mock service layer implementation - ready for database migration
import messageLibraryData from "@/services/mockData/messageLibrary.json";

class MessageLibraryService {
  constructor() {
    this.messages = [...messageLibraryData];
    // Initialize ApperClient for future database integration
    this.apperClient = null;
    this.initializeClient();
  }

  initializeClient() {
    if (typeof window !== 'undefined' && window.ApperSDK) {
      const { ApperClient } = window.ApperSDK;
      this.apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
    }
  }

  async getAll() {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return [...this.messages];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching message library:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return [];
    }
  }

  async getById(id) {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      const message = this.messages.find(m => m.Id === parseInt(id));
      if (!message) {
        throw new Error(`Message with Id ${id} not found`);
      }
      return { ...message };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching message with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async create(messageData) {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      const newId = this.messages.length > 0 ? Math.max(...this.messages.map(m => m.Id)) + 1 : 1;
      const newMessage = {
        Id: newId,
        createdAt: new Date().toISOString(),
        ...messageData
      };
      this.messages.push(newMessage);
      return { ...newMessage };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating message:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  async update(id, messageData) {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      const index = this.messages.findIndex(m => m.Id === parseInt(id));
      if (index === -1) {
        throw new Error(`Message with Id ${id} not found`);
      }
      this.messages[index] = { ...this.messages[index], ...messageData };
      return { ...this.messages[index] };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating message:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  async delete(id) {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const index = this.messages.findIndex(m => m.Id === parseInt(id));
      if (index === -1) {
        throw new Error(`Message with Id ${id} not found`);
      }
      this.messages.splice(index, 1);
      return true;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting message:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      throw error;
    }
  }

async generateMessage(occasion, language, tone, userInput = null) {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Enhanced AI-generated messages with voice input support
      if (userInput && userInput.trim()) {
        // Generate AI content based on user's voice/text input
        return await this.generateAIMessage(userInput, occasion, language, tone);
      }

      // Enhanced message templates with more variety
      const messageTemplates = {
        "Festival Greeting": {
          "English": {
            "Formal": "We extend our warmest wishes to you and your family on this auspicious occasion. {voter_name}, may this festival bring prosperity, peace, and happiness to your home. Your community stands with you in celebration.",
            "Casual": "Hey {voter_name}! 🎉 Hope you're having an amazing celebration with your loved ones. May this festival fill your home with joy, laughter, and sweet memories. Enjoy every moment!",
            "Inspirational": "Dear {voter_name}, as we celebrate this beautiful festival, let's remember that unity and joy make our community stronger. May this occasion inspire us to support one another and build bridges of understanding. Together, we shine brighter!",
            "Voice-Generated": "Celebrating with you, {voter_name}! This festival reminds us of the beautiful diversity in our community. May your celebrations be filled with love, prosperity, and the company of those you cherish most."
          },
          "Marathi": {
            "Formal": "या शुभ अवसरावर आपल्या आणि आपल्या कुटुंबाला मनापासून शुभेच्छा. {voter_name}, हा सण आपल्या घरात समृद्धी, शांती आणि आनंद आणो. आपला समुदाय आपल्या सोबत उत्सव साजरा करत आहे.",
            "Casual": "अरे {voter_name}! 🎉 तुमचा सण कसा जात आहे? खूप आनंद करा आणि मिठाई खा! हा सण तुमच्या घरात आनंद आणि गोड आठवणी भरून जाओ!",
            "Inspirational": "प्रिय {voter_name}, या सुंदर सणाच्या निमित्ताने आपण सगळे मिळून आपल्या समाजाला मजबूत बनवूया! हा सण आपल्याला एकमेकांना साथ देण्यासाठी प्रेरणा देतो. एकत्र आपण अधिक तेजस्वी होतो!",
            "Voice-Generated": "{voter_name}, तुमच्यासोबत सण साजरा करत आहोत! हा सण आपल्या समुदायातील सुंदर विविधतेची आठवण करून देतो. तुमचा उत्सव प्रेम, समृद्धी आणि प्रिय व्यक्तींच्या सहवासाने भरलेला जाओ."
          }
        },
        "Event Invite": {
          "English": {
            "Formal": "Dear {voter_name}, You are cordially invited to attend our upcoming community event. Your presence would be highly valued as we discuss matters important to our neighborhood's future. Together, we can make a difference.",
            "Casual": "Hi {voter_name}! 👋 Got an awesome community event coming up - would love to see you there! We'll have great discussions, refreshments, and a chance to connect with neighbors. Don't miss out!",
            "Inspirational": "Join us, {voter_name}, as we come together to build a better tomorrow for our community! Your voice, your ideas, and your presence can help shape positive change. Every participation matters!",
            "Voice-Generated": "{voter_name}, we're hosting a special community gathering and your unique perspective would enrich our discussions. Come be part of the solution and help us create positive change together."
          },
          "Marathi": {
            "Formal": "आदरणीय {voter_name}, आपल्याला आमच्या येत्या सामुदायिक कार्यक्रमास उपस्थित राहण्यासाठी आमंत्रित करतो. आपल्या परिसराच्या भविष्याशी संबंधित महत्वाच्या गोष्टींवर चर्चा करताना आपली उपस्थिती अत्यंत मोलाची असेल.",
            "Casual": "अरे {voter_name}! एक छान समुदायिक कार्यक्रम येत आहे - तुम्ही नक्की या! चांगली चर्चा, नाश्ता आणि शेजाऱ्यांशी भेटण्याची संधी मिळेल. चुकवू नका!",
            "Inspirational": "{voter_name}, आपल्या समाजाचे चांगले भविष्य घडवण्यासाठी आमच्यासोबत सामील व्हा! तुमचा आवाज, तुमच्या कल्पना आणि तुमची उपस्थिती सकारात्मक बदल घडवू शकते. प्रत्येक सहभाग महत्वाचा आहे!",
            "Voice-Generated": "{voter_name}, आम्ही एक विशेष सामुदायिक मेळावा आयोजित करत आहोत आणि तुमचा अनोखा दृष्टिकोन आमच्या चर्चेला समृद्ध करेल. समाधानाचा भाग बना आणि आमच्यासोबत सकारात्मक बदल घडवूया."
          }
        },
        "General Update": {
          "English": {
            "Formal": "Dear {voter_name}, We would like to update you on the recent developments in our community initiatives. Your continued support has been instrumental in achieving these milestones. Thank you for being an engaged citizen.",
            "Casual": "Hey {voter_name}! Quick update on what's happening in our neighborhood 📢 Some really cool progress to share with you! Thanks for being such an awesome community member.",
            "Inspirational": "{voter_name}, together we're making real progress! Here's what we've accomplished recently with your support. Every small step forward is a victory for our community. Keep up the amazing spirit!",
            "Voice-Generated": "Hello {voter_name}, exciting updates from our community! Thanks to residents like you, we're seeing positive changes take root. Your involvement makes all the difference in building the neighborhood we all want to live in."
          },
          "Marathi": {
            "Formal": "आदरणीय {voter_name}, आमच्या सामुदायिक उपक्रमांमधील अलीकडील घडामोडींची माहिती देत आहोत. या यशामध्ये तुमच्या सतत पाठिंब्याचा मोठा वाटा आहे. एक जबाबदार नागरिक म्हणून तुमचे आभार.",
            "Casual": "अरे {voter_name}! आमच्या परिसरात काय चालू आहे ते सांगतो 📢 काही खरोखर छान प्रगती तुमच्यासोबत शेअर करायची आहे! तुम्ही इतके छान समुदायिक सदस्य आहात म्हणून धन्यवाद.",
            "Inspirational": "{voter_name}, आपण सगळे मिळून खरोखर प्रगती करत आहोत! तुमच्या पाठिंब्याने अलीकडेच आपण जे साध्य केले आहे ते पाहा. पुढे टाकलेले प्रत्येक छोटे पाऊल आपल्या समुदायासाठी विजय आहे. तुमचा अद्भुत उत्साह कायम ठेवा!",
            "Voice-Generated": "नमस्कार {voter_name}, आमच्या समुदायाकडून रोमांचक अपडेट्स! तुमच्यासारख्या रहिवाशांमुळे आम्ही सकारात्मक बदल पाहत आहोत. आम्हा सर्वांना राहायचा परिसर निर्माण करण्यात तुमचा सहभाग सर्व फरक करतो."
          }
        },
        "Voice Input Custom": {
          "English": {
            "Formal": "Dear {voter_name}, based on community input and feedback, we are implementing new initiatives that address your specific concerns and suggestions.",
            "Casual": "Hey {voter_name}! We heard you loud and clear! 📣 Here's what we're doing about the things you mentioned.",
            "Inspirational": "{voter_name}, your voice sparked action! Together, we're turning community input into real solutions that benefit everyone.",
            "Voice-Generated": "Thank you, {voter_name}, for sharing your thoughts with us. Your input is helping shape our community initiatives in meaningful ways."
          }
        }
      };

      // Enhanced selection with fallback
      const selectedTemplate = messageTemplates[occasion]?.[language]?.[tone] || 
        messageTemplates[occasion]?.[language]?.["Formal"] ||
        messageTemplates["General Update"]?.[language]?.[tone] ||
        `Dear {voter_name}, thank you for your continued support and engagement with our community initiatives. Your participation makes our community stronger.`;

      return selectedTemplate;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error generating message:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  async generateAIMessage(userInput, occasion, language, tone) {
    try {
      // Simulate AI processing of voice/text input to generate personalized messages
      await new Promise(resolve => setTimeout(resolve, 800));

      const toneAdjustments = {
        "Formal": "respectful and professional",
        "Casual": "friendly and approachable", 
        "Inspirational": "motivational and uplifting",
        "Voice-Generated": "personalized and engaging"
      };

      const languageGreetings = {
        "English": "Dear {voter_name}",
        "Marathi": "आदरणीय {voter_name}",
        "Hindi": "प्रिय {voter_name}"
      };

      const greeting = languageGreetings[language] || languageGreetings["English"];

      // Process user input to generate contextual message
      let aiGeneratedContent = "";
      
      if (userInput.toLowerCase().includes('festival') || userInput.toLowerCase().includes('celebration')) {
        aiGeneratedContent = language === "Marathi" ? 
          `${greeting}, तुमच्या सुंदर विचारांनुसार हा सण आनंदाने साजरा करूया! तुमच्या सुझावानुसार आम्ही समुदायिक उत्सवाची योजना करत आहोत.` :
          `${greeting}, based on your wonderful thoughts about celebrations, let's make this festival truly special! We're planning community festivities inspired by your suggestions.`;
      } else if (userInput.toLowerCase().includes('community') || userInput.toLowerCase().includes('together')) {
        aiGeneratedContent = language === "Marathi" ?
          `${greeting}, तुमच्या समुदायप्रेमी विचारांमुळे आम्हाला प्रेरणा मिळते! एकत्र मिळून आपण चांगले काम करू शकतो.` :
          `${greeting}, your community-focused thoughts inspire us all! Together, we can achieve great things for our neighborhood.`;
      } else if (userInput.toLowerCase().includes('help') || userInput.toLowerCase().includes('support')) {
        aiGeneratedContent = language === "Marathi" ?
          `${greeting}, तुमच्या मदतीच्या भावनेबद्दल धन्यवाद! आमच्या समुदायात तुमच्यासारखी व्यक्ती असल्यामुळे आम्ही भाग्यवान आहोत.` :
          `${greeting}, thank you for your spirit of support and assistance! We're fortunate to have community members like you.`;
      } else {
        // General AI response based on tone
        const responses = {
          "English": {
            "Formal": `${greeting}, your valuable input has been carefully considered. We appreciate your thoughtful contribution: "${userInput}". Our team is working to address these important points.`,
            "Casual": `${greeting}, thanks for sharing your thoughts! 😊 We really appreciate your input: "${userInput}". Let's work together on this!`,
            "Inspirational": `${greeting}, your words inspire action! "${userInput}" - this is exactly the kind of engaged thinking our community needs. Together, we'll make it happen!`,
            "Voice-Generated": `${greeting}, based on your input: "${userInput}", we're excited to work together on solutions that benefit everyone in our community.`
          },
          "Marathi": {
            "Formal": `${greeting}, तुमच्या मौल्यवान सुझावांचा काळजीपूर्वक विचार केला आहे. तुमच्या विचारशील योगदानाबद्दल आम्ही कृतज्ञ आहोत: "${userInput}". आमची टीम या महत्वाच्या मुद्द्यांवर काम करत आहे.`,
            "Casual": `${greeting}, तुमचे विचार शेअर केल्याबद्दल धन्यवाद! 😊 तुमच्या सुझावांची आम्हाला खरोखर कदर आहे: "${userInput}". यावर एकत्र काम करूया!`,
            "Inspirational": `${greeting}, तुमचे शब्द कृतीला प्रेरणा देतात! "${userInput}" - आपल्या समुदायाला अशाच सहभागी विचारसरणीची गरज आहे. एकत्र मिळून आपण हे साकार करू!`,
            "Voice-Generated": `${greeting}, तुमच्या सुझावांच्या आधारे: "${userInput}", आम्ही आमच्या समुदायातील सर्वांच्या फायद्यासाठी उपाययोजनांवर एकत्र काम करण्यास उत्सुक आहोत.`
          }
        };

        aiGeneratedContent = responses[language]?.[tone] || responses["English"][tone] || responses["English"]["Formal"];
      }

      return aiGeneratedContent;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error generating AI message:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      throw error;
    }
  }
}

export default new MessageLibraryService();