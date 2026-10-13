const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding MarketLearn database...');

  // Clean existing data
  await prisma.userBadge.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.contentCalendar.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.assessmentResult.deleteMany();
  await prisma.assessment.deleteMany();
  await prisma.userProgress.deleteMany();
  await prisma.quizAttempt.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.businessProfile.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const user = await prisma.user.create({
    data: {
      id: 'user_alex_morgan',
      email: 'alex@marketlearn.dev',
      name: 'Alex Morgan',
      password: 'password123',
      role: 'USER',
      xp: 420,
      level: 'Learner',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    },
  });

  const admin = await prisma.user.create({
    data: {
      id: 'user_admin',
      email: 'admin@marketlearn.dev',
      name: 'Sarah Jenkins',
      password: 'adminpassword123',
      role: 'ADMIN',
      xp: 1250,
      level: 'Growth Expert',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
    },
  });

  // Business Profile for Alex
  const businessProfile = await prisma.businessProfile.create({
    data: {
      userId: user.id,
      businessName: 'Artisan Roast Coffee Co.',
      industry: 'Retail & Specialty Food',
      website: 'https://artisanroast.example.com',
      stage: 'Growing',
      primaryGoal: 'Attract Local Foot Traffic & Online Bean Subscriptions',
      targetAudience: 'Coffee enthusiasts, local neighborhood residents, remote workers looking for cozy spaces.',
      monthlyBudget: 850,
      growthScore: 72,
    },
  });

  // Create Badges
  const badges = await Promise.all([
    prisma.badge.create({
      data: {
        name: 'SEO Starter',
        slug: 'seo-starter',
        description: 'Completed local search optimization basics and keyword research.',
        icon: 'Search',
        category: 'Starter',
        xpReward: 50,
      },
    }),
    prisma.badge.create({
      data: {
        name: 'Content Creator',
        slug: 'content-creator',
        description: 'Crafted 5 high-converting social media posts and scheduled a monthly calendar.',
        icon: 'Sparkles',
        category: 'Tool',
        xpReward: 75,
      },
    }),
    prisma.badge.create({
      data: {
        name: 'Social Media Starter',
        slug: 'social-media-starter',
        description: 'Mastered audience targeting and hook writing on Instagram and LinkedIn.',
        icon: 'Share2',
        category: 'Starter',
        xpReward: 50,
      },
    }),
    prisma.badge.create({
      data: {
        name: 'Marketing Planner',
        slug: 'marketing-planner',
        description: 'Generated a comprehensive quarterly promotional plan and budget.',
        icon: 'Calendar',
        category: 'Tool',
        xpReward: 100,
      },
    }),
    prisma.badge.create({
      data: {
        name: 'Analytics Beginner',
        slug: 'analytics-beginner',
        description: 'Interpreted CAC, CTR, and conversion metrics to optimize ad spend.',
        icon: 'BarChart3',
        category: 'Mastery',
        xpReward: 75,
      },
    }),
  ]);

  // Award badges to Alex
  await prisma.userBadge.create({
    data: {
      userId: user.id,
      badgeId: badges[0].id,
    },
  });
  await prisma.userBadge.create({
    data: {
      userId: user.id,
      badgeId: badges[1].id,
    },
  });
  await prisma.userBadge.create({
    data: {
      userId: user.id,
      badgeId: badges[2].id,
    },
  });

  // Create Courses
  const coursesData = [
    {
      title: 'Digital Marketing Fundamentals',
      slug: 'digital-marketing-fundamentals',
      category: 'Fundamentals',
      difficulty: 'Beginner',
      duration: '2.0 Hours',
      iconName: 'Compass',
      accentColor: '#635BFF',
      order: 1,
      description: 'Master the foundational digital marketing framework tailored for independent retail, services, and local businesses.',
      lessons: [
        {
          title: 'The Small Business Marketing Funnel',
          slug: 'small-business-marketing-funnel',
          duration: '12 mins',
          order: 1,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          exercisePrompt: 'Map out the 3 stages (Awareness, Consideration, Purchase) for one core product or service in your business.',
          keyTakeaways: JSON.stringify([
            'Top of Funnel: Attracting strangers through value-first content, search visibility, and localized social reels.',
            'Middle of Funnel: Cultivating trust via customer reviews, email lead magnets, and transparent pricing.',
            'Bottom of Funnel: Converting interested prospects with friction-free checkout, clear CTAs, and timely follow-ups.'
          ]),
          content: `### Understanding How Modern Customers Buy

For most small business owners, marketing can feel like shouting into a void. The secret to predictable customer acquisition isn't posting constantly on every platform—it's building a straightforward 3-stage funnel that addresses customer needs at each step.

#### The 3 Core Stages

1. **Awareness (Discovery)**: A prospective customer discovers they have a problem or desire (e.g., "I need a quiet place to work with good coffee" or "My sink is leaking"). They encounter your business through local SEO, word-of-mouth, or targeted social media.
2. **Consideration (Trust Building)**: The prospect compares options. They check your Google Business profile ratings, glance at your Instagram photos to evaluate atmosphere, or read customer testimonials on your website.
3. **Conversion (Taking Action)**: The prospect makes a purchase, books a consultation, or signs up for a recurring subscription.

> **Pro Tip for Small Businesses**: Most marketing failures happen when businesses jump directly from Awareness to asking for the sale without establishing trust first. Give value before asking for money.`,
        },
        {
          title: 'Defining Your Ideal Customer Profile (ICP)',
          slug: 'defining-ideal-customer-profile',
          duration: '15 mins',
          order: 2,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          exercisePrompt: 'Write a 3-sentence profile describing your single highest-margin customer type.',
          keyTakeaways: JSON.stringify([
            'When you target everyone, you resonate with no one.',
            'Focus on customer pain points, urgent desires, and willingness to pay.',
            'Identify where your ideal customers hang out online and in real life.'
          ]),
          content: `### Stop Marketing to "Everyone"

If you ask ten small business owners who their customer is, nine will reply: *"Anyone who needs our service!"* 

While technically true, marketing to everyone dilutes your message until it sounds generic and forgettable. High-converting marketing speaks directly to a specific person's exact frustration.

#### Building Your ICP Matrix

- **Demographics**: Location, budget tier, business size or household income.
- **Pain Points**: What problem keeps them up at night? What friction have they experienced with competitors?
- **Decision Drivers**: Do they value convenience, handcrafted quality, ultra-fast delivery, or budget-friendliness?
- **Channels**: Do they search Google Maps, browse Instagram Stories during lunch, or ask neighbors on local community groups?`,
        },
        {
          title: 'Value Proposition & Positioning',
          slug: 'value-proposition-and-positioning',
          duration: '14 mins',
          order: 3,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          exercisePrompt: 'Fill in the positioning template: "We help [Target Audience] achieve [Desired Outcome] without [Common Pain Point]."',
          keyTakeaways: JSON.stringify([
            'A compelling value proposition is clear within 5 seconds of landing on your page.',
            'Positioning highlights your competitive differentiation.',
            'Features describe what your product is; benefits describe how customer lives improve.'
          ]),
          content: `### What Makes You The Obvious Choice?

A value proposition is the promise of measurable value to be delivered. It's the primary reason a prospect should buy from you instead of your nearest competitor.

#### The 5-Second Clarity Test

When a visitor lands on your homepage or Instagram bio, can they answer these three questions within 5 seconds?
1. What do you sell?
2. Who is it for?
3. Why should I choose you over alternatives?

If the answer involves buzzwords like *"synergistic solutions"* or *"exceptional service"*, it fails the clarity test. State clearly: *"Freshly roasted single-origin coffee beans delivered to your doorstep within 48 hours of roasting."*`,
        },
      ],
      quiz: {
        title: 'Fundamentals Knowledge Check',
        description: 'Test your understanding of marketing funnels, customer profiling, and positioning.',
        passingScore: 70,
        questions: [
          {
            question: 'What is the primary objective of the "Middle of Funnel" (Consideration stage)?',
            options: [
              'To immediately demand a credit card purchase on first contact',
              'To build trust, demonstrate authority, and resolve doubts through reviews and social proof',
              'To run billboard ads across the entire city',
              'To discount all products by 80%'
            ],
            correctAnswerIndex: 1,
            explanation: 'The Consideration stage is focused on building trust, demonstrating credibility through testimonials, and proving your product solves their specific problem.'
          },
          {
            question: 'Which of the following is the most effective Ideal Customer Profile (ICP) definition?',
            options: [
              'All men and women aged 18 to 75 who like beverages',
              'Busy remote professionals in urban neighborhoods seeking ethically sourced, low-acid coffee beans on monthly subscription',
              'Anyone with an active internet connection',
              'Every business owner in North America'
            ],
            correctAnswerIndex: 1,
            explanation: 'A strong ICP is tightly focused with specific pain points, habits, and clear purchasing motivation.'
          },
          {
            question: 'Why does the 5-second clarity test matter for your website homepage?',
            options: [
              'Search engine spiders crawl pages in under 5 seconds only',
              'Online visitors make snap judgments and bounce if they cannot instantly discern what you offer and how it helps them',
              'Legal regulations require full disclosures within 5 seconds',
              'To speed up browser rendering speed'
            ],
            correctAnswerIndex: 1,
            explanation: 'Visitors have short attention spans. If your primary value proposition is not evident in seconds, conversion rates drop dramatically.'
          }
        ]
      }
    },
    {
      title: 'Social Media Marketing',
      slug: 'social-media-marketing',
      category: 'Social',
      difficulty: 'Beginner',
      duration: '2.5 Hours',
      iconName: 'Share2',
      accentColor: '#8B7CF6',
      order: 2,
      description: 'Learn how to generate organic reach, write hooks that capture attention, and turn casual followers into paying customers.',
      lessons: [
        {
          title: 'Choosing the Right Platform for Your Business',
          slug: 'choosing-the-right-platform',
          duration: '12 mins',
          order: 1,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          exercisePrompt: 'Pick your ONE primary platform and ONE secondary platform based on where your audience actively shops.',
          keyTakeaways: JSON.stringify([
            'Better to dominate one platform than post mediocre content across four.',
            'B2C local businesses thrive on Instagram and TikTok visual storytelling.',
            'B2B professional services generate higher return on LinkedIn and focused email.'
          ]),
          content: `### The Myth of Being Everywhere

Many small business owners burn out trying to maintain Twitter, TikTok, Facebook, Instagram, Pinterest, and YouTube all at once. The result? Inconsistent posting, low engagement, and exhausted owners.

#### Platform Selection Matrix

- **Instagram**: High visual appeal. Perfect for cafes, boutiques, fitness coaches, interior designers, restaurants.
- **LinkedIn**: Thought leadership, partnerships, B2B services, consulting, local commercial networking.
- **Facebook**: Ideal for local community groups, neighborhood promotions, parent demographics, event announcements.
- **TikTok**: Rapid algorithmic reach for relatable behind-the-scenes, product demonstrations, and founder stories.`,
        },
        {
          title: 'Writing Compelling Hooks and Captions',
          slug: 'writing-compelling-hooks-and-captions',
          duration: '16 mins',
          order: 2,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          exercisePrompt: 'Write 3 different opening hooks for your next promotional post using the "Curiosity + Benefit" framework.',
          keyTakeaways: JSON.stringify([
            'The first sentence (the hook) accounts for 80% of your post performance.',
            'Avoid generic openers like "Happy Monday!" or "Check this out!"',
            'Always end with a specific Call to Action (CTA).'
          ]),
          content: `### Anatomy of a High-Converting Social Post

Users scroll through social feeds at lightning speed. Your hook must break their scrolling pattern within 1.5 seconds.

#### Hook Formats That Consistently Work:

1. **The Common Mistake**: *"90% of home coffee brewers make this one grind mistake (and it ruins the flavor)."*
2. **Behind the Curtain**: *"Here is what actually happened when we switched to direct-trade beans last month."*
3. **The Counter-Intuitive Truth**: *"Why you should never store whole-bean coffee in your refrigerator."*

Follow your hook with structured, scannable value, and close with a direct CTA: *"Tap the link in bio to read our complete brewing guide."*`,
        },
      ],
      quiz: {
        title: 'Social Strategy Quiz',
        description: 'Check your knowledge on organic social media reach, hooks, and content repurposing.',
        passingScore: 70,
        questions: [
          {
            question: 'What is the role of the hook in a social media caption or short-form video?',
            options: [
              'To fulfill character counts required by algorithms',
              'To stop the user from scrolling by sparking curiosity, addressing a pain point, or promising immediate value',
              'To list every product SKU in stock',
              'To thank everyone for following your account'
            ],
            correctAnswerIndex: 1,
            explanation: 'The hook is the critical first sentence or first 2 seconds that stops the scroll and convinces the viewer to engage.'
          },
          {
            question: 'For a time-constrained solo business owner, what is the best social media practice?',
            options: [
              'Post 10 times a day on 6 different social networks simultaneously',
              'Focus deeply on mastering 1 primary platform where your target customers hang out before expanding',
              'Never post anything unless you hire a $10,000/month agency',
              'Buy 50,000 fake followers to look established'
            ],
            correctAnswerIndex: 1,
            explanation: 'Consistency and depth on one high-yield platform always outperforms thin, scattered posting across multiple channels.'
          }
        ]
      }
    },
    {
      title: 'Search Engine Optimization (SEO)',
      slug: 'search-engine-optimization-seo',
      category: 'SEO',
      difficulty: 'Intermediate',
      duration: '3.0 Hours',
      iconName: 'Search',
      accentColor: '#0EA5E9',
      order: 3,
      description: 'Rank higher on Google, capture high-intent local searchers, and optimize your Google Business profile.',
      lessons: [
        {
          title: 'Google Business Profile Masterclass',
          slug: 'google-business-profile-masterclass',
          duration: '18 mins',
          order: 1,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          exercisePrompt: 'Audit your Google Business Profile name, category, hours, and upload 5 recent high-res photos.',
          keyTakeaways: JSON.stringify([
            'Your Google Business Profile is the #1 driver of high-intent local customer calls and visits.',
            'Consistently responding to customer reviews signals active management to Google ranking algorithms.',
            'Add accurate primary and secondary categories to appear in relevant search queries.'
          ]),
          content: `### Dominating the Local 3-Pack

When potential customers search *"best specialty coffee near me"* or *"emergency plumber downtown"*, Google displays the Local 3-Pack before organic search results. Ranking here provides massive free traffic.

#### Key Optimization Checklist:

1. **Exact NAP Consistency**: Name, Address, and Phone number must be identical across your website, Google, Apple Maps, and directories.
2. **Weekly Photo Uploads**: Businesses with 100+ photos receive 520% more calls and 1065% more website clicks according to Google data.
3. **Review Velocity**: Systematically request reviews from satisfied clients with a direct review shortlink. Always respond politely to every review within 48 hours.`,
        },
        {
          title: 'On-Page SEO Basics for Small Websites',
          slug: 'on-page-seo-basics',
          duration: '15 mins',
          order: 2,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          exercisePrompt: 'Craft an optimized title tag and meta description for your core product or services landing page.',
          keyTakeaways: JSON.stringify([
            'Title tags should include your primary keyword + location + brand name (under 60 characters).',
            'Meta descriptions serve as ad copy in search results; include a clear reason to click.',
            'Structure pages with a single H1 tag followed by logical H2 and H3 subheadings.'
          ]),
          content: `### Making Your Web Pages Understandable to Search Engines

On-page SEO ensures search engine crawlers know exactly what services you offer and which geographic areas you serve.

#### Critical Elements to Configure:

- **H1 Header**: Every page must have exactly one H1 describing the page topic (e.g., *"Artisanal Single-Origin Coffee Roastery in Austin, TX"*).
- **Internal Linking**: Link your educational blog posts to your service/product checkout pages.
- **Image Alt Tags**: Describe images naturally with descriptive text so both visually impaired users and search engine bots understand them.`,
        },
      ],
      quiz: {
        title: 'Local SEO Mastery Quiz',
        description: 'Verify your understanding of Google Business Profile setup, local citations, and on-page optimization.',
        passingScore: 70,
        questions: [
          {
            question: 'What does "NAP consistency" stand for in local SEO?',
            options: [
              'Network Access Protocol',
              'Name, Address, and Phone Number',
              'New Audience Platform',
              'Native Advertising Placement'
            ],
            correctAnswerIndex: 1,
            explanation: 'NAP stands for Name, Address, and Phone number. Maintaining consistency across citations builds search engine trust.'
          },
          {
            question: 'Where should your primary target keyword appear for the strongest on-page ranking signal?',
            options: [
              'Repeated 500 times in tiny invisible white text in the footer',
              'In the page Title Tag, H1 header, and naturally within the opening paragraph',
              'Only in the copyright notice at the bottom',
              'In an encrypted password field'
            ],
            correctAnswerIndex: 1,
            explanation: 'Having your keyword in the Title tag, H1 heading, and introductory content signals topical relevance clearly.'
          }
        ]
      }
    },
    {
      title: 'Content Marketing',
      slug: 'content-marketing',
      category: 'Content',
      difficulty: 'Beginner',
      duration: '2.5 Hours',
      iconName: 'FileText',
      accentColor: '#EC4899',
      order: 4,
      description: 'Create engaging blog posts, practical buyer guides, and case studies that turn organic readers into loyal advocates.',
      lessons: [
        {
          title: 'The "They Ask, You Answer" Content Strategy',
          slug: 'they-ask-you-answer-strategy',
          duration: '14 mins',
          order: 1,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          exercisePrompt: 'List 5 common questions customers ask before purchasing, and outline a short article answering each.',
          keyTakeaways: JSON.stringify([
            'The best content topics come directly from customer emails, phone calls, and DM inquiries.',
            'Directly addressing pricing, pros & cons, and comparisons builds deep customer trust.',
            'Educated buyers have higher conversion rates and lower refund rates.'
          ]),
          content: `### Creating Content That Answers Real Buying Questions

Stop wondering what to write about. Your customers are already asking you the exact questions they need answered before swiping their credit cards!

#### The Big 5 Content Topics That Drive Sales:

1. **Cost & Pricing**: Why does your product cost what it costs? What variables change the price?
2. **Problems & Limitations**: Who is your product NOT right for? (Being honest repels bad-fit clients and attracts your ideal clients).
3. **Versus Comparisons**: Product A vs. Product B (e.g., *"Pour-over vs. French Press: Which produces richer coffee?"*).
4. **Best in Class Reviews**: Highlight independent evaluations of tools, gear, or ingredients.
5. **How-To Tutorials**: Step-by-step guides helping prospects achieve quick wins.`,
        },
      ],
      quiz: {
        title: 'Content Strategy Check',
        description: 'Test your grasp of customer-centric content creation and lead generation.',
        passingScore: 70,
        questions: [
          {
            question: 'Why is publishing transparent pricing and cost explanations effective for small businesses?',
            options: [
              'Because customers search specifically for pricing information and trust companies that answer openly',
              'It forces competitors to lower their prices',
              'It removes the need to ever talk to customers',
              'It guarantees #1 rank on Google immediately'
            ],
            correctAnswerIndex: 0,
            explanation: 'Customers always want to know price ranges before engaging. Addressing it openly eliminates friction and establishes transparent authority.'
          }
        ]
      }
    },
    {
      title: 'Online Advertising',
      slug: 'online-advertising',
      category: 'Advertising',
      difficulty: 'Intermediate',
      duration: '3.5 Hours',
      iconName: 'Target',
      accentColor: '#F59E0B',
      order: 5,
      description: 'Learn paid traffic fundamentals: Google Search Ads for high-intent searchers and Meta Ads for visual demand generation.',
      lessons: [
        {
          title: 'Search Intent Ads vs. Social Feed Ads',
          slug: 'search-vs-social-ads',
          duration: '16 mins',
          order: 1,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          exercisePrompt: 'Calculate your target customer acquisition cost (CAC) based on your average customer order value.',
          keyTakeaways: JSON.stringify([
            'Google Search Ads capture existing intent (customers actively searching for an immediate solution).',
            'Meta / TikTok Ads create new demand (disrupting feeds with compelling creative and irresistible offers).',
            'Never run ads without proper conversion tracking installed.'
          ]),
          content: `### Choosing the Right Ad Strategy for Your Budget

Running paid ads without a clear strategy is the fastest way to burn through marketing budget with zero return.

#### Search Ads (Demand Capture)
When someone types *"espresso machine repair near me"*, they have immediate purchasing intent. Bidding on these exact keywords delivers high conversion rates because the user is ready to hire or buy right now.

#### Social Ads (Demand Generation)
Users on Instagram or Facebook aren't searching for your business—they are looking at friends' vacation photos. Your ad must provide an entertaining, eye-catching hook with an offer so compelling it halts their scroll.`,
        },
      ],
      quiz: {
        title: 'Paid Ads Strategy Quiz',
        description: 'Understand ROAS, CTR, ad spend budgeting, and platform selection.',
        passingScore: 70,
        questions: [
          {
            question: 'What is the fundamental difference between Google Search Ads and Meta (Facebook/Instagram) Ads?',
            options: [
              'Google Ads are only for text books while Meta is for movies',
              'Google captures active search intent, while Meta generates visual demand and interruption awareness',
              'Google Ads are completely free of charge',
              'Meta Ads can only be shown to desktop computer users'
            ],
            correctAnswerIndex: 1,
            explanation: 'Google Search captures active intent when people search for answers; Meta interrupts feed scrolling to generate brand awareness.'
          }
        ]
      }
    },
    {
      title: 'Analytics & Growth Tracking',
      slug: 'analytics-and-growth-tracking',
      category: 'Analytics',
      difficulty: 'Intermediate',
      duration: '2.0 Hours',
      iconName: 'BarChart3',
      accentColor: '#22C55E',
      order: 6,
      description: 'Understand marketing numbers that matter: Customer Acquisition Cost (CAC), Return on Ad Spend (ROAS), and Conversion Rates.',
      lessons: [
        {
          title: 'The Essential Small Business Metrics Dashboard',
          slug: 'essential-metrics-dashboard',
          duration: '15 mins',
          order: 1,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          exercisePrompt: 'Calculate your website conversion rate from the past 30 days (Orders divided by Total Unique Visitors x 100).',
          keyTakeaways: JSON.stringify([
            'Vanity metrics (likes, impressions) do not pay the bills; focus on leads, sales, and CAC.',
            'Track your Customer Lifetime Value (LTV) to understand how much you can afford to spend on acquisition.',
            'A 1% increase in conversion rate can double net profit without increasing ad budget.'
          ]),
          content: `### Cutting Through Analytics Confusion

Analytics tools display thousands of data points, but small business owners only need to monitor four key metrics to make confident decisions.

#### The 4 Metrics That Matter:

1. **CAC (Customer Acquisition Cost)**: Total marketing & ad spend divided by the number of new customers acquired in that period.
2. **LTV (Customer Lifetime Value)**: The average total gross profit a customer generates across their entire relationship with your business.
3. **Conversion Rate (CVR)**: Percentage of visitors who take the desired action (e.g., submit contact form or buy coffee).
4. **ROAS (Return on Ad Spend)**: Revenue generated directly from advertising divided by total ad spend. A 3.5x ROAS means every $1 spent brings $3.50 in revenue.`,
        },
      ],
      quiz: {
        title: 'Metrics & Analytics Quiz',
        description: 'Verify your ability to interpret key performance indicators and unit economics.',
        passingScore: 70,
        questions: [
          {
            question: 'If you spend $500 on ads and acquire 10 new paying customers, what is your Customer Acquisition Cost (CAC)?',
            options: [
              '$5 per customer',
              '$50 per customer',
              '$500 per customer',
              '$10 per customer'
            ],
            correctAnswerIndex: 1,
            explanation: '$500 divided by 10 customers = $50 Customer Acquisition Cost (CAC).'
          }
        ]
      }
    }
  ];

  const createdCourses = [];

  for (const cData of coursesData) {
    const course = await prisma.course.create({
      data: {
        title: cData.title,
        slug: cData.slug,
        category: cData.category,
        difficulty: cData.difficulty,
        duration: cData.duration,
        iconName: cData.iconName,
        accentColor: cData.accentColor,
        order: cData.order,
        description: cData.description,
      },
    });

    createdCourses.push(course);

    // Create lessons
    const createdLessons = [];
    for (const lData of cData.lessons) {
      const lesson = await prisma.lesson.create({
        data: {
          courseId: course.id,
          title: lData.title,
          slug: lData.slug,
          duration: lData.duration,
          order: lData.order,
          videoUrl: lData.videoUrl,
          exercisePrompt: lData.exercisePrompt,
          keyTakeaways: lData.keyTakeaways,
          content: lData.content,
        },
      });
      createdLessons.push(lesson);
    }

    // Create quiz
    if (cData.quiz) {
      const quiz = await prisma.quiz.create({
        data: {
          courseId: course.id,
          title: cData.quiz.title,
          description: cData.quiz.description,
          passingScore: cData.quiz.passingScore,
        },
      });

      for (let i = 0; i < cData.quiz.questions.length; i++) {
        const q = cData.quiz.questions[i];
        await prisma.question.create({
          data: {
            quizId: quiz.id,
            question: q.question,
            optionsJson: JSON.stringify(q.options),
            correctAnswerIndex: q.correctAnswerIndex,
            explanation: q.explanation,
            order: i + 1,
          },
        });
      }
    }
  }

  // Set realistic user progress for Alex: 68% progress overall
  // Mark several lessons as completed
  const allLessons = await prisma.lesson.findMany();
  const completedLessonCount = Math.floor(allLessons.length * 0.68);

  for (let i = 0; i < completedLessonCount; i++) {
    await prisma.userProgress.create({
      data: {
        userId: user.id,
        courseId: allLessons[i].courseId,
        lessonId: allLessons[i].id,
        completed: true,
        completedAt: new Date(Date.now() - (completedLessonCount - i) * 86400000),
      },
    });
  }

  // Quiz Attempts for Alex: average ~84%
  const allQuizzes = await prisma.quiz.findMany();
  if (allQuizzes.length > 0) {
    await prisma.quizAttempt.create({
      data: {
        userId: user.id,
        quizId: allQuizzes[0].id,
        score: 3,
        maxScore: 3,
        percentage: 100,
        passed: true,
      },
    });
  }
  if (allQuizzes.length > 1) {
    await prisma.quizAttempt.create({
      data: {
        userId: user.id,
        quizId: allQuizzes[1].id,
        score: 2,
        maxScore: 2,
        percentage: 100,
        passed: true,
      },
    });
  }
  if (allQuizzes.length > 2) {
    await prisma.quizAttempt.create({
      data: {
        userId: user.id,
        quizId: allQuizzes[2].id,
        score: 1,
        maxScore: 2,
        percentage: 50,
        passed: false,
      },
    });
  }

  // Assessment Result for Alex (Score 72/100 matching spec)
  await prisma.assessmentResult.create({
    data: {
      userId: user.id,
      overallScore: 72,
      socialScore: 80,
      seoScore: 55,
      contentScore: 72,
      advertisingScore: 61,
      analyticsScore: 48,
      recommendationsJson: JSON.stringify([
        {
          area: 'Analytics & Tracking',
          score: 48,
          priority: 'High',
          action: 'Install Google Tag Manager and define conversion goals for your online store to measure CAC accurately.',
          suggestedCourse: 'analytics-and-growth-tracking',
        },
        {
          area: 'Search Engine Optimization (SEO)',
          score: 55,
          priority: 'High',
          action: 'Optimize your Google Business Profile categories and gather 10 new customer reviews with photos this month.',
          suggestedCourse: 'search-engine-optimization-seo',
        },
        {
          area: 'Online Advertising',
          score: 61,
          priority: 'Medium',
          action: 'Test localized Google Search Ads targeting high-intent zip codes within a 5-mile radius.',
          suggestedCourse: 'online-advertising',
        },
      ]),
    },
  });

  // Marketing Campaigns for Alex
  await prisma.campaign.createMany({
    data: [
      {
        userId: user.id,
        name: 'Spring Cold Brew Launch',
        platform: 'Instagram',
        objective: 'Brand Awareness & Local Foot Traffic',
        targetAudience: 'Locals aged 22-45 interested in artisan coffee within 5 miles',
        budget: 350.00,
        startDate: new Date(Date.now() - 10 * 86400000),
        endDate: new Date(Date.now() + 15 * 86400000),
        status: 'Active',
        progress: 65,
        reach: 14280,
        clicks: 840,
        conversions: 112,
      },
      {
        userId: user.id,
        name: 'Local Search "Best Coffee Near Me"',
        platform: 'Google Ads',
        objective: 'High-Intent In-Store Visits',
        targetAudience: 'Downtown workers & visitors searching for specialty coffee',
        budget: 400.00,
        startDate: new Date(Date.now() - 20 * 86400000),
        endDate: new Date(Date.now() + 10 * 86400000),
        status: 'Active',
        progress: 80,
        reach: 8900,
        clicks: 620,
        conversions: 89,
      },
      {
        userId: user.id,
        name: 'Monthly Coffee Bean Subscription Drive',
        platform: 'Email & LinkedIn',
        objective: 'Direct E-Commerce Sales',
        targetAudience: 'Subscribers who haven’t purchased in 60 days',
        budget: 150.00,
        startDate: new Date(Date.now() + 5 * 86400000),
        endDate: new Date(Date.now() + 25 * 86400000),
        status: 'Planned',
        progress: 0,
        reach: 0,
        clicks: 0,
        conversions: 0,
      },
    ],
  });

  // Content Calendar entries
  const today = new Date();
  await prisma.contentCalendar.createMany({
    data: [
      {
        userId: user.id,
        title: 'Behind the Scenes: Roasting Ethiopian Yirgacheffe',
        platform: 'Instagram',
        contentType: 'Reel/Video',
        scheduledDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 10, 0),
        caption: 'Ever wondered what happens at 400°F? Watch the first crack of our single-origin Ethiopian beans! ☕ Drop your favorite brew method below.',
        hashtags: '#SpecialtyCoffee #CoffeeRoasters #SmallBatch #BaristaLife',
        status: 'Planned',
      },
      {
        userId: user.id,
        title: '3 Mistakes Ruining Your Morning French Press',
        platform: 'Instagram',
        contentType: 'Carousel',
        scheduledDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 14, 0),
        caption: 'Water too hot? Inconsistent grind? Steeping for 10 minutes? Here is how to fix your French press in 3 simple adjustments.',
        hashtags: '#CoffeeLovers #FrenchPress #BrewingGuide #CoffeeHacks',
        status: 'Planned',
      },
      {
        userId: user.id,
        title: 'Why We Support Direct Trade with Colombian Farmers',
        platform: 'LinkedIn',
        contentType: 'Article',
        scheduledDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2, 9, 30),
        caption: 'Ethical sourcing is more than a buzzword. Here is the transparent breakdown of our green bean pricing and how direct partnerships empower local growers.',
        hashtags: '#Sustainability #EthicalBusiness #DirectTrade #SupplyChain',
        status: 'Published',
      },
      {
        userId: user.id,
        title: 'Weekend Cold Brew Nitro Tasting Promo',
        platform: 'Facebook',
        contentType: 'Single Image',
        scheduledDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 11, 0),
        caption: 'Free samples this Saturday 11am-2pm at the roastery patio! Bring your reusable tumbler for $1 off any full pour.',
        hashtags: '#AustinEats #AustinCoffee #WeekendVibes #ColdBrew',
        status: 'Draft',
      },
    ],
  });

  // Certificate for Alex Morgan
  await prisma.certificate.create({
    data: {
      certificateCode: 'ML-2026-8942-GROWTH',
      userId: user.id,
      courseId: createdCourses[0].id,
      title: 'Digital Marketing Fundamentals & Growth Strategy',
      issuedToName: 'Alex Morgan',
      scoreAchieved: 94,
      verificationUrl: 'https://marketlearn.dev/verify/ML-2026-8942-GROWTH',
    },
  });

  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
