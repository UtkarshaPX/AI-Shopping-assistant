import OpenAI from 'openai';

// Create OpenAI instance safely
const createOpenAIClient = () => {
  try {
    return new OpenAI({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY || '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',
      dangerouslyAllowBrowser: true // Required for client-side usage
    });
  } catch (error) {
    console.error("Failed to initialize OpenAI client:", error);
    return null;
  }
};

const openai = createOpenAIClient();

export const getAIResponse = async (message) => {
  try {
    if (!openai) {
      // If OpenAI client is not available, use a mock response instead of throwing an error
      console.warn("OpenAI client not available, using mock responses");
      return getMockChatResponse(message);
    }
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are ShopWise, an AI shopping assistant. You help users make smart buying decisions." },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('AI Service Error:', error);
    // Return mock response instead of error message
    return getMockChatResponse(message);
  }
};

// Mock chat response function to simulate AI responses when API is unavailable
function getMockChatResponse(message) {
  const lowercaseMsg = message.toLowerCase();
  
  // Common greetings
  if (lowercaseMsg.includes('hello') || lowercaseMsg.includes('hi') || lowercaseMsg.includes('hey')) {
    return "Hello! I'm happy to help you today. Are you looking for any specific product recommendations?";
  }
  
  // Product related queries
  if (lowercaseMsg.includes('phone') || lowercaseMsg.includes('smartphone')) {
    return "I'd recommend looking at the iPhone 15 Pro, Samsung Galaxy S24 Ultra, or Google Pixel 8. Each has different strengths. What features matter most to you?";
  }
  
  if (lowercaseMsg.includes('laptop') || lowercaseMsg.includes('computer')) {
    return "For laptops, the MacBook Air M2, Dell XPS 13, and Lenovo ThinkPad X1 Carbon are excellent choices. What will you primarily use it for?";
  }
  
  if (lowercaseMsg.includes('headphone') || lowercaseMsg.includes('earbud')) {
    return "AirPods Pro 2, Samsung Galaxy Buds 2 Pro, and Sony WF-1000XM5 are top choices for wireless earbuds. Do you prioritize sound quality, noise cancellation, or price?";
  }
  
  if (lowercaseMsg.includes('watch') || lowercaseMsg.includes('smartwatch')) {
    return "Apple Watch Series 9, Samsung Galaxy Watch 6, and Garmin Forerunner 955 are leading smartwatches. Are you interested in fitness tracking, notifications, or health monitoring?";
  }
  
  if (lowercaseMsg.includes('recommend') || lowercaseMsg.includes('suggest') || lowercaseMsg.includes('best')) {
    return "I'd be happy to recommend products! Could you tell me what type of item you're looking for?";
  }
  
  if (lowercaseMsg.includes('price') || lowercaseMsg.includes('cost') || lowercaseMsg.includes('expensive')) {
    return "Price is definitely an important factor. I can help you find options in different price ranges. What product are you interested in?";
  }
  
  if (lowercaseMsg.includes('compare') || lowercaseMsg.includes('difference')) {
    return "Comparing products is a great approach. What specific items would you like me to compare for you?";
  }
  
  // Default response for other queries
  return "I'm here to help you find the perfect products for your needs. Could you tell me more about what you're looking for?";
}

export const getProductRecommendations = async (query) => {
  // Convert query to lowercase for easier matching
  const lowercaseQuery = query.toLowerCase();
  
  // Define different product categories
  const productCategories = {
    // Smartphone related products
    smartphone: {
      recommendations: [
        {
          id: 's1',
          name: 'iPhone 15 Pro',
          rating: 4.8,
          price: 999.99,
          image: 'https://example.com/iphone.jpg',
          pros: ['Excellent camera', 'Great performance', 'Good battery life'],
          cons: ['Expensive', 'No charger included'],
          inStock: true
        },
        {
          id: 's2',
          name: 'Samsung Galaxy S24 Ultra',
          rating: 4.7,
          price: 1199.99,
          image: 'https://example.com/galaxy.jpg',
          pros: ['Best Android experience', 'Amazing display', 'S Pen included'],
          cons: ['High price', 'Large form factor'],
          inStock: true
        },
        {
          id: 's3',
          name: 'Google Pixel 8',
          rating: 4.6,
          price: 699.99,
          image: 'https://example.com/pixel.jpg',
          pros: ['Pure Android', 'Exceptional camera', 'Regular updates'],
          cons: ['Average battery life'],
          inStock: true
        }
      ],
      followUpQuestion: 'Which feature matters most to you: camera quality, battery life, or software experience?'
    },
    
    // Laptop related products
    laptop: {
      recommendations: [
        {
          id: 'l1',
          name: 'MacBook Air M2',
          rating: 4.9,
          price: 1099.99,
          image: 'https://example.com/macbook.jpg',
          pros: ['Powerful M2 chip', 'Great battery life', 'Lightweight'],
          cons: ['Limited ports', 'Not upgradable'],
          inStock: true
        },
        {
          id: 'l2',
          name: 'Dell XPS 13',
          rating: 4.7,
          price: 1299.99,
          image: 'https://example.com/dell.jpg',
          pros: ['Beautiful display', 'Premium build', 'Good performance'],
          cons: ['Pricey', 'Webcam could be better'],
          inStock: true
        },
        {
          id: 'l3',
          name: 'Lenovo ThinkPad X1 Carbon',
          rating: 4.6,
          price: 1399.99,
          image: 'https://example.com/thinkpad.jpg',
          pros: ['Excellent keyboard', 'Business focused', 'Durable'],
          cons: ['Expensive', 'Design not for everyone'],
          inStock: false
        }
      ],
      followUpQuestion: 'What will you primarily use your laptop for: work, gaming, or everyday use?'
    },
    
    // Headphones/earbuds related products
    earbuds: {
      recommendations: [
        {
          id: 'e1',
          name: 'AirPods Pro 2',
          rating: 4.8,
          price: 249.99,
          image: 'https://example.com/airpods.jpg',
          pros: ['Great ANC', 'Seamless Apple integration'],
          cons: ['Pricey'],
          inStock: true
        },
        {
          id: 'e2',
          name: 'Samsung Galaxy Buds 2 Pro',
          rating: 4.6,
          price: 189.99,
          image: 'https://example.com/galaxy-buds.jpg',
          pros: ['Excellent sound', 'Good battery'],
          cons: ['Not ideal for iPhones'],
          inStock: true
        },
        {
          id: 'e3',
          name: 'Sony WF-1000XM5',
          rating: 4.9,
          price: 279.99,
          image: 'https://example.com/sony.jpg',
          pros: ['Best-in-class ANC', 'Audiophile quality', 'Great app'],
          cons: ['Expensive', 'Bulkier than competitors'],
          inStock: true
        }
      ],
      followUpQuestion: 'Which of these features matter most to you: sound quality, noise cancellation, or price?'
    },
    
    // Smart watches
    smartwatch: {
      recommendations: [
        {
          id: 'w1',
          name: 'Apple Watch Series 9',
          rating: 4.8,
          price: 399.99,
          image: 'https://example.com/apple-watch.jpg',
          pros: ['Deep iOS integration', 'Excellent health features', 'Great app ecosystem'],
          cons: ['Battery life only 1 day', 'Only works with iPhone'],
          inStock: true
        },
        {
          id: 'w2',
          name: 'Samsung Galaxy Watch 6',
          rating: 4.7,
          price: 299.99,
          image: 'https://example.com/galaxy-watch.jpg',
          pros: ['Works with all phones', 'Good health tracking', 'Rotating bezel'],
          cons: ['Battery could be better', 'Limited apps'],
          inStock: true
        },
        {
          id: 'w3',
          name: 'Garmin Forerunner 955',
          rating: 4.9,
          price: 499.99,
          image: 'https://example.com/garmin.jpg',
          pros: ['Exceptional battery life', 'Advanced fitness metrics', 'Built for athletes'],
          cons: ['Pricey', 'Bulky design'],
          inStock: false
        }
      ],
      followUpQuestion: "What's your primary use for a smartwatch: fitness tracking, notifications, or health monitoring?"
    },
    
    // Tablets
    tablet: {
      recommendations: [
        {
          id: 't1',
          name: 'iPad Pro 12.9-inch',
          rating: 4.9,
          price: 1099.99,
          image: 'https://example.com/ipad.jpg',
          pros: ['Powerful M1 chip', 'Stunning display', 'Great for creatives'],
          cons: ['Expensive', 'Limited multitasking'],
          inStock: true
        },
        {
          id: 't2',
          name: 'Samsung Galaxy Tab S8',
          rating: 4.7,
          price: 899.99,
          image: 'https://example.com/galaxy-tab.jpg',
          pros: ['Great display', 'Good performance', 'S Pen included'],
          cons: ['Pricey', 'Android app support'],
          inStock: true
        },
        {
          id: 't3',
          name: 'Microsoft Surface Pro 8',
          rating: 4.6,
          price: 999.99,
          image: 'https://example.com/surface.jpg',
          pros: ['Versatile', 'Windows 11', 'Good build quality'],
          cons: ['Keyboard sold separately', 'Battery life'],
          inStock: false
        }
      ],
      followUpQuestion: 'What will you primarily use your tablet for: work, entertainment, or creativity?'
    },
    
    // Cameras
    camera: {
      recommendations: [
        {
          id: 'c1',
          name: 'Canon EOS R5',
          rating: 4.9,
          price: 3899.99,
          image: 'https://example.com/canon.jpg',
          pros: ['High resolution', 'Excellent autofocus', '8K video'],
          cons: ['Expensive', 'Overheating issues'],
          inStock: true
        },
        {
          id: 'c2',
          name: 'Sony A7 IV',
          rating: 4.8,
          price: 2499.99,
          image: 'https://example.com/sony-camera.jpg',
          pros: ['Great image quality', 'Good battery life', 'Versatile'],
          cons: ['Complex menu system'],
          inStock: true
        },
        {
          id: 'c3',
          name: 'Nikon Z6 II',
          rating: 4.7,
          price: 1999.99,
          image: 'https://example.com/nikon.jpg',
          pros: ['Solid build', 'Good video features', 'Dual card slots'],
          cons: ['Limited lens selection'],
          inStock: false
        }
      ],
      followUpQuestion: 'Are you looking for a camera for photography, videography, or both?'
    },
    
    // Speakers
    speaker: {
      recommendations: [
        {
          id: 'sp1',
          name: 'Sonos One',
          rating: 4.8,
          price: 199.99,
          image: 'https://example.com/sonos.jpg',
          pros: ['Great sound', 'Smart assistant integration', 'Compact design'],
          cons: ['Pricey for size'],
          inStock: true
        },
        {
          id: 'sp2',
          name: 'Bose SoundLink Revolve+',
          rating: 4.7,
          price: 299.99,
          image: 'https://example.com/bose.jpg',
          pros: ['360-degree sound', 'Portable', 'Good battery life'],
          cons: ['Expensive'],
          inStock: true
        },
        {
          id: 'sp3',
          name: 'JBL Charge 5',
          rating: 4.6,
          price: 179.99,
          image: 'https://example.com/jbl.jpg',
          pros: ['Rugged design', 'Good sound', 'Long battery life'],
          cons: ['Bulky'],
          inStock: false
        }
      ],
      followUpQuestion: 'Do you need a speaker for home use, portability, or both?'
    },
    
    // Monitors
    monitor: {
      recommendations: [
        {
          id: 'm1',
          name: 'Dell UltraSharp U2720Q',
          rating: 4.9,
          price: 599.99,
          image: 'https://example.com/dell-monitor.jpg',
          pros: ['4K resolution', 'Excellent color accuracy', 'USB-C connectivity'],
          cons: ['Expensive'],
          inStock: true
        },
        {
          id: 'm2',
          name: 'LG 27GN950-B',
          rating: 4.8,
          price: 799.99,
          image: 'https://example.com/lg-monitor.jpg',
          pros: ['4K resolution', '144Hz refresh rate', 'G-Sync compatible'],
          cons: ['Pricey'],
          inStock: true
        },
        {
          id: 'm3',
          name: 'ASUS TUF Gaming VG27AQ',
          rating: 4.7,
          price: 429.99,
          image: 'https://example.com/asus-monitor.jpg',
          pros: ['1440p resolution', '165Hz refresh rate', 'Good value'],
          cons: ['Limited HDR'],
          inStock: false
        }
      ],
      followUpQuestion: 'Are you looking for a monitor for gaming, work, or general use?'
    },
    
    // Printers
    printer: {
      recommendations: [
        {
          id: 'p1',
          name: 'HP OfficeJet Pro 9025',
          rating: 4.8,
          price: 329.99,
          image: 'https://example.com/hp-printer.jpg',
          pros: ['Fast printing', 'Good quality', 'Wireless connectivity'],
          cons: ['Bulky'],
          inStock: true
        },
        {
          id: 'p2',
          name: 'Canon PIXMA TR8620',
          rating: 4.7,
          price: 199.99,
          image: 'https://example.com/canon-printer.jpg',
          pros: ['Good photo quality', 'Compact design', 'Affordable'],
          cons: ['Slow printing'],
          inStock: true
        },
        {
          id: 'p3',
          name: 'Brother HL-L2350DW',
          rating: 4.6,
          price: 159.99,
          image: 'https://example.com/brother-printer.jpg',
          pros: ['Fast printing', 'Affordable', 'Compact'],
          cons: ['No color printing'],
          inStock: false
        }
      ],
      followUpQuestion: 'Do you need a printer for home, office, or photo printing?'
    },
    
    // Smart Home Devices
    smartHome: {
      recommendations: [
        {
          id: 'sh1',
          name: 'Google Nest Hub (2nd Gen)',
          rating: 4.8,
          price: 99.99,
          image: 'https://example.com/nest-hub.jpg',
          pros: ['Affordable', 'Good display', 'Smart home integration'],
          cons: ['Limited app support'],
          inStock: true
        },
        {
          id: 'sh2',
          name: 'Amazon Echo Show 8',
          rating: 4.7,
          price: 129.99,
          image: 'https://example.com/echo-show.jpg',
          pros: ['Good sound', 'Smart assistant', 'Video calling'],
          cons: ['Bulky'],
          inStock: true
        },
        {
          id: 'sh3',
          name: 'Philips Hue Starter Kit',
          rating: 4.6,
          price: 199.99,
          image: 'https://example.com/hue.jpg',
          pros: ['Great lighting', 'Smart home integration', 'Easy setup'],
          cons: ['Expensive'],
          inStock: false
        }
      ],
      followUpQuestion: 'Are you interested in smart displays, speakers, or lighting?'
    },
    
    // Jeans
    jeans: {
      recommendations: [
        {
          id: 'j1',
          name: "Levi's 501 Original Fit Jeans",
          rating: 4.8,
          price: 59.99,
          image: 'https://example.com/levis.jpg',
          pros: ['Classic style', 'Durable', 'Comfortable'],
          cons: ['Limited stretch'],
          inStock: true
        },
        {
          id: 'j2',
          name: 'Wrangler Authentics Classic 5-Pocket Jeans',
          rating: 4.7,
          price: 29.99,
          image: 'https://example.com/wrangler.jpg',
          pros: ['Affordable', 'Good fit', 'Variety of colors'],
          cons: ['Basic design'],
          inStock: true
        },
        {
          id: 'j3',
          name: 'Lee Modern Series Slim Fit Jeans',
          rating: 4.6,
          price: 49.99,
          image: 'https://example.com/lee.jpg',
          pros: ['Modern fit', 'Stretch fabric', 'Stylish'],
          cons: ['Runs small'],
          inStock: false
        }
      ],
      followUpQuestion: 'What style of jeans are you looking for: classic, slim, or relaxed fit?'
    },
    
    // Shorts
    shorts: {
      recommendations: [
        {
          id: 's1',
          name: 'Nike Sportswear Club Shorts',
          rating: 4.8,
          price: 34.99,
          image: 'https://example.com/nike-shorts.jpg',
          pros: ['Comfortable', 'Breathable', 'Stylish'],
          cons: ['Limited color options'],
          inStock: true
        },
        {
          id: 's2',
          name: 'Adidas Essentials 3-Stripes Shorts',
          rating: 4.7,
          price: 29.99,
          image: 'https://example.com/adidas-shorts.jpg',
          pros: ['Classic design', 'Good fit', 'Durable'],
          cons: ['Basic style'],
          inStock: true
        },
        {
          id: 's3',
          name: 'Under Armour Raid 10" Shorts',
          rating: 4.6,
          price: 24.99,
          image: 'https://example.com/ua-shorts.jpg',
          pros: ['Lightweight', 'Moisture-wicking', 'Flexible'],
          cons: ['Runs large'],
          inStock: false
        }
      ],
      followUpQuestion: 'Are you looking for casual, athletic, or cargo shorts?'
    },
    
    // Shirts
    shirts: {
      recommendations: [
        {
          id: 'sh1',
          name: 'Ralph Lauren Polo Shirt',
          rating: 4.9,
          price: 89.99,
          image: 'https://example.com/ralph-lauren.jpg',
          pros: ['Classic style', 'High quality', 'Versatile'],
          cons: ['Expensive'],
          inStock: true
        },
        {
          id: 'sh2',
          name: "Hanes Men's ComfortSoft T-Shirt",
          rating: 4.7,
          price: 14.99,
          image: 'https://example.com/hanes.jpg',
          pros: ['Affordable', 'Soft fabric', 'Good fit'],
          cons: ['Basic design'],
          inStock: true
        },
        {
          id: 'sh3',
          name: 'Calvin Klein Slim Fit Dress Shirt',
          rating: 4.8,
          price: 49.99,
          image: 'https://example.com/calvin-klein.jpg',
          pros: ['Stylish', 'Good fit', 'Quality fabric'],
          cons: ['Wrinkles easily'],
          inStock: false
        }
      ],
      followUpQuestion: 'Do you need a shirt for casual, formal, or business casual occasions?'
    },
    
    // Pants
    pants: {
      recommendations: [
        {
          id: 'p1',
          name: "Dockers Men's Classic Fit Workday Khaki Pants",
          rating: 4.8,
          price: 44.99,
          image: 'https://example.com/dockers.jpg',
          pros: ['Comfortable', 'Durable', 'Good fit'],
          cons: ['Limited color options'],
          inStock: true
        },
        {
          id: 'p2',
          name: "Levi's 541 Athletic Fit Pants",
          rating: 4.7,
          price: 59.99,
          image: 'https://example.com/levis-pants.jpg',
          pros: ['Stylish', 'Stretch fabric', 'Good fit'],
          cons: ['Runs small'],
          inStock: true
        },
        {
          id: 'p3',
          name: "Men's ComfortSoft T-Shirt",
          rating: 4.6,
          price: 39.99,
          image: 'https://example.com/uniqlo.jpg',
          pros: ['Affordable', 'Comfortable', 'Versatile'],
          cons: ['Limited sizes'],
          inStock: false
        }
      ],
      followUpQuestion: 'Are you looking for casual, formal, or athletic pants?'
    },
    
    // Accessories
    accessories: {
      recommendations: [
        {
          id: 'a1',
          name: 'Ray-Ban Aviator Sunglasses',
          rating: 4.9,
          price: 154.99,
          image: 'https://example.com/ray-ban.jpg',
          pros: ['Classic style', 'High quality', 'UV protection'],
          cons: ['Expensive'],
          inStock: true
        },
        {
          id: 'a2',
          name: "Fossil Men's Leather Wallet",
          rating: 4.8,
          price: 39.99,
          image: 'https://example.com/fossil.jpg',
          pros: ['Durable', 'Stylish', 'Good quality'],
          cons: ['Limited card slots'],
          inStock: true
        },
        {
          id: 'a3',
          name: 'Timex Weekender Watch',
          rating: 4.7,
          price: 49.99,
          image: 'https://example.com/timex.jpg',
          pros: ['Affordable', 'Versatile', 'Easy to read'],
          cons: ['Basic design'],
          inStock: false
        }
      ],
      followUpQuestion: 'Are you looking for sunglasses, wallets, or watches?'
    },
    
    // Default category for other queries
    default: {
      recommendations: [
        {
          id: 'd1',
          name: 'Echo Dot (5th Gen)',
          rating: 4.5,
          price: 49.99,
          image: 'https://example.com/echo.jpg',
          pros: ['Affordable', 'Good sound for size', 'Alexa integration'],
          cons: ['Not audiophile quality'],
          inStock: true
        },
        {
          id: 'd2',
          name: 'PlayStation 5',
          rating: 4.8,
          price: 499.99,
          image: 'https://example.com/ps5.jpg',
          pros: ['Next-gen gaming', 'Fast SSD', 'Great exclusive games'],
          cons: ['Large size', 'Limited availability'],
          inStock: false
        },
        {
          id: 'd3',
          name: 'Kindle Paperwhite',
          rating: 4.7,
          price: 139.99,
          image: 'https://example.com/kindle.jpg',
          pros: ['Weeks of battery life', 'Backlit display', 'Waterproof'],
          cons: ['Only for reading', 'No color display'],
          inStock: true
        }
      ],
      followUpQuestion: "I see you're looking for product recommendations. Can you tell me more specifically what you're looking for?"
    }
  };
  
  // Determine which category to return based on the search query
  let result;
  
  if (lowercaseQuery.includes('phone') || lowercaseQuery.includes('iphone') || lowercaseQuery.includes('android') || lowercaseQuery.includes('samsung') || lowercaseQuery.includes('pixel')) {
    result = productCategories.smartphone;
  } 
  else if (lowercaseQuery.includes('laptop') || lowercaseQuery.includes('macbook') || lowercaseQuery.includes('dell') || lowercaseQuery.includes('computer') || lowercaseQuery.includes('notebook')) {
    result = productCategories.laptop;
  }
  else if (lowercaseQuery.includes('earbud') || lowercaseQuery.includes('headphone') || lowercaseQuery.includes('airpod') || lowercaseQuery.includes('audio') || lowercaseQuery.includes('sound')) {
    result = productCategories.earbuds;
  }
  else if (lowercaseQuery.includes('watch') || lowercaseQuery.includes('apple watch') || lowercaseQuery.includes('smartwatch') || lowercaseQuery.includes('wearable')) {
    result = productCategories.smartwatch;
  }
  else if (lowercaseQuery.includes('tablet') || lowercaseQuery.includes('ipad') || lowercaseQuery.includes('galaxy tab') || lowercaseQuery.includes('surface')) {
    result = productCategories.tablet;
  }
  else if (lowercaseQuery.includes('camera') || lowercaseQuery.includes('dslr') || lowercaseQuery.includes('mirrorless')) {
    result = productCategories.camera;
  }
  else if (lowercaseQuery.includes('speaker') || lowercaseQuery.includes('sound system') || lowercaseQuery.includes('audio')) {
    result = productCategories.speaker;
  }
  else if (lowercaseQuery.includes('monitor') || lowercaseQuery.includes('display') || lowercaseQuery.includes('screen')) {
    result = productCategories.monitor;
  }
  else if (lowercaseQuery.includes('printer') || lowercaseQuery.includes('print') || lowercaseQuery.includes('scanner')) {
    result = productCategories.printer;
  }
  else if (lowercaseQuery.includes('smart home') || lowercaseQuery.includes('smart device') || lowercaseQuery.includes('home automation')) {
    result = productCategories.smartHome;
  }
  else if (lowercaseQuery.includes('jeans') || lowercaseQuery.includes('denim')) {
    result = productCategories.jeans;
  }
  else if (lowercaseQuery.includes('shorts') || lowercaseQuery.includes('bermuda')) {
    result = productCategories.shorts;
  }
  else if (lowercaseQuery.includes('shirt') || lowercaseQuery.includes('t-shirt') || lowercaseQuery.includes('polo')) {
    result = productCategories.shirts;
  }
  else if (lowercaseQuery.includes('pants') || lowercaseQuery.includes('trousers') || lowercaseQuery.includes('slacks')) {
    result = productCategories.pants;
  }
  else if (lowercaseQuery.includes('accessory') || lowercaseQuery.includes('sunglasses') || lowercaseQuery.includes('wallet') || lowercaseQuery.includes('watch')) {
    result = productCategories.accessories;
  }
  else {
    result = productCategories.default;
  }
  
  return result; // Return result immediately without delay
};
