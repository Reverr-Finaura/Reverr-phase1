export const courseData = [
  {
    id: 0,
    title: 'Competitor Analysis',
    modules: [
      {
       module:1,
       slides:[
       {
         heading: 'What is a business model canvas and how to write one?',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Fch1haeding.png?alt=media&token=42032e75-5c68-4352-8941-93299d6fa277',
         type: 'intro',
       },
       {
         text: 'A business model Canvas is a way to determine a company business model in a transparent, straightforward manner. It can be used to develop new business ideas or to draw an existing business model. ',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2FfScreen2.png?alt=media&token=35d17413-0c23-43b4-b528-8de3cf52649f',
         type: 'textimg',
       },
       {
         question: 'What is a business model canvas?',
         options: [
           'A business model Canvas is a way to determine a company business model in a transparent, straightforward manner.',
           'A business model Canvas is a way to determine a company business model in a transparent, in-detail manner manner.',
           'A business model Canvas is a way to determine a company business model in a complex and detailed manner',
           'none of these',
         ],
         ans: 1,
         type: 'quiz',
       },
       {
         heading: 'Business model canvas framework',
         text: ' The business model canvas framework contains nine sections. Let’s take a closer look at each one.',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2FfrontScreenImg.png?alt=media&token=0aa4d74c-2c40-4ec5-85f3-73906bf6e996',
         type: 'headtextimg',
       },
       {
         heading: '1. Key Partners',
         text: 'For the key partners section, we are trying to determine who else you need in order for your startup to be successful. Who’s going along for this journey with you and your teammates?',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Fheadtextimgpoint.png?alt=media&token=62799a6d-4b5b-4b3e-a922-44d40cdb2897',
         points: [
           'Who are our key partners?',
           'Who are your suppliers, if relevant?',
           'Who are your investors, if relevant?',
         ],
         type: 'headtextimgpoints',
       },
       {
         heading: '2. Key Activities',
         text: 'What’s the most important thing your company has to do in order to be successful? The answer to this is often the product or service you’re delivering to the end consumer.',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Fv.png?alt=media&token=41e492c9-0ce8-4e57-8d30-fe42df7952fd',
         points: [
           'What’s the most important action your startup needs to take in order to be successful? You must settle on one.',
         ],
         type: 'headtextimgpoints',
       },
       {
         heading: '3. Key Resources',
         text: 'In order to be successful, startup needs a variety of resources. “Resources” doesn’t just mean money, though, although that type of resource is certainly important. Resources refers to everything your startup needs to succeed.      ',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Fheadtextimgpoint.png?alt=media&token=62799a6d-4b5b-4b3e-a922-44d40cdb2897',
         points: [
           'What financial resources do we need?',
           'What human resources do we need?',
           'What physical resources do we need?',
           'What intellectual resources do we need?',
         ],
         type: 'headtextimgpoints',
       },
       {
         heading: '4. Value Proposition',
         text: 'Startup’s value proposition is the promise you make to customers about the services or goods you’re going to deliver. It can also be thought of as the value your customers find in your product.',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Fheadtextimgpoint.png?alt=media&token=62799a6d-4b5b-4b3e-a922-44d40cdb2897',
         points: [
           'What value do we bring to our customers?',
           'What problem are we solving? ',
           'What makes us different from our competitors?',
           'What’s new about our startup?',
         ],
         type: 'headtextimgpoints',
       },
       {
         heading: '5. Customer Segments',
         text: 'No product can survive without customers, which makes it essential to determine what your customer segments are. The business model canvas has five customer segments: mass market, niche market, segmented, diversified, and multi-sided platform/market.',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2F5.png?alt=media&token=42202e64-0ab6-428b-b38f-3f2fcbac17eb',
         points: [],
         type: 'headtextimgpoints',
       },
       {
         question: 'Which among the following is question we should ask ourselves when writing the key resources section',
         options: [
           'where can we find investors?',
           'What makes us different from our competitors?',
           'what human resource do we need?        ',
           'both a  & c',
         ],
         ans: 2,
         type: 'quiz',
       },
       {
         heading: 'Mass Market',
         subheading: 'widest possible range',
         text: 'Mass market means your product or service appeals to the widest possible range of people.',
         sub_text: 'Think of a product like dishwashing soap. Pretty much everyone uses it.',
         img: 'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2FHand%20washing.png?alt=media&token=6700c4ac-aeb0-47e6-a9ef-a335a7fc44f7',
         type: 'headsubtextimg',
       },
       {
         heading: 'Segmented',
         subheading: '',
         text: 'Many companies have multiple markets within their main market. This is called a segmented market. ',
         sub_text: 'So, for example, you may need to segment out your market based on demographic characteristics like age, gender, or location.',
         img: 'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Fequity%20illustration.png?alt=media&token=af299deb-6793-4697-bfda-4845fa108209',
         type: 'headsubtextimg',
       },
       {
         heading: 'Diversified',
         subheading: '',
         text: 'A company that serves more than one market segment has a diversified market.',
         sub_text: '',
         img: 'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2FWireframe.png?alt=media&token=9a84e7f2-4909-4bcd-83a2-2f7d1be9e504',
         type: 'headsubtextimg',
       },
       {
         heading: 'Multi-Sided Platform',
         text: 'Some companies have two or more markets that they’re serving simultaneously, with the same business. For example, if your company is a go-between for vendors and buyers like Amazon is then you have a multi-sided platform.',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2FMarketing%20employee%20working%20on%20marketing%20strategy.png?alt=media&token=40abcab5-04c7-4dfc-9285-a157e3bb5d19',
         points: [
           'Who are our most important customers?',
           'Who were our very first customers? ',
           'Who gets the most out of our value proposition?',
         ],
         type: 'headtextimgpoints',
       },
       {
         question: 'What is a niche market?',
         options: [
           'Multiple Market within a main market',
           'having more than one market',
           'Market that contains a specific group of people  ',
           'widest possible range of market',
         ],
         ans: 2,
         type: 'quiz',
       },
       {
         heading: '6. Customer Relationships',
         text: 'Startup founders know that customer service is the key to success. Customer relationships can take the form of personal assistance, dedicated personal assistance, self-service, automated service, communities, and co-creation. But whichever method you choose, just make sure it’s excellent.',
         image:
           '',
         points: [
           'How is my company going to interact with customers?        ',
           'How am you going to provide that key support and build an ongoing relationship with them?',
           'How will customers be able to reach us if they need support with our product',
           'What’s the most cost-effective way to still provide great customer service?.',
         ],
         type: 'headtextimgpoints',
       },
       {
         heading: '7. Channels to reach customers',
         text: 'Your company won’t survive if you can’t reach your customers so how are you going to get your product or service to them?',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2FLayer_3.png?alt=media&token=fd0a9d5b-6418-4ebc-8b29-53d3ea1b66ff',
         points: [
           'Are we going to reach our customers directly, through our own channels?',
           'Are we going to reach our customers through partner channels, like Amazon or a podcast network or other major distributors?',
           'Or are we going to use a combination of both?',
         ],
         type: 'headtextimgpoints',
       },
       {
         question: 'Which is NOT one of the customer segments?',
         options: [
           'Buyer’s Market',
           'Niche Market',
           'Segmented market        ',
           'Diversified Market',
         ],
         ans: 3,
         type: 'quiz',
       },
       {
         heading: '8. Cost Structure',
         text: 'In this section, you’re going to explore the different costs and monetary consequences of your model.',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2FfrontScreenImg.png?alt=media&token=0aa4d74c-2c40-4ec5-85f3-73906bf6e996',
         points: [
           'Is your company cost-drive or value-driven?',
           'What are your fixed costs?',
           'What are the most important costs for your startup?',
           'Which Key Resources are most expensive?',
           'What are your variable costs?',
           'What are your economies of scale?',
           'What are your economies of scope?',
         ],
         type: 'headtextimgpoints',
       },
       {
         heading: '9. Revenue Streams',
         text: 'Your revenue streams are how you actually make money and how much money you make. Your startup may have one or many revenue streams, but this is where you’ll identify them.',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2FfrontScreenImg.png?alt=media&token=0aa4d74c-2c40-4ec5-85f3-73906bf6e996',
         points: [
           'What are your customers currently paying for similar products?',
           'How are they paying for those products?',
           'Do they like that payment method? Would they prefer a different one?',
           'How much are they willing to pay you?',
           'How much does each individual revenue stream contribute to overall revenue of the company?',
         ],
         type: 'headtextimgpoints',
       },
       {
         heading: 'oeuwiyjjs',
         subheading: 'wtqcsags',
         text: 'psams jasia kasjiajs',
         sub_text: 'jahsj kasia ajshj',
         type: 'headsubtext',
       },]
      },
      {
       name:"model2",
       slides:[
       {
         heading: 'How is a business model canvas different from a traditional business plan?      ',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Fch1haeding.png?alt=media&token=42032e75-5c68-4352-8941-93299d6fa277',
         type: 'intro',
       },
       {
         text: 'A typical business plan can take months to create and can run up to 100 pages. It`s about making a map of all the possible scenarios for your business, from the weather for your five-year profit to income, table of goods, market size, product, solution ... You get an idea ... It is a consistent document designed to assure entrepreneurs and investors that the company will succeed.',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Flayer2.png?alt=media&token=c0e76fb9-c91b-4a57-902d-f8a1bca4244f',
         type: 'textimg',
       },
       {
         text: 'A business model canvas, on the other hand, can be created in a day. It is intended to be a flexible document that helps to provide structure in the beginning, with the understanding that it is just the beginning. It fits well with the first soft model because it is about finding a model that is created quickly for entrepreneurs to start exploring their thinking and hypothesis. A soft start is focused on moving fast and navigating as often as necessary, which a typical business model does not allow you to do..',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Flayer2.png?alt=media&token=c0e76fb9-c91b-4a57-902d-f8a1bca4244f',
         type: 'textimg',
       },
       {
         question: 'Creating a business model canvas is more time consuming than creating a business plan      ',
         options: [
           'true',
           'False',
         ],
         ans: 1,
         type: 'quiz',
       },
       {
         heading: ' How does it help?      ',
         text: 'By using Business Model Canvas, you can get a complete overview of your business idea at all angles. So, for example, control, strategy or managers will get instant access to specific information you need. BMC gives start-up companies the opportunity to present their ideas. Using BMC for new projects is also an option for companies.',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Fch1haeding.png?alt=media&token=42032e75-5c68-4352-8941-93299d6fa277',
         type: 'headtextimg',
       },
       {
         text: 'Strong business models can give you a competitive edge in your industry because they can help you make more profit than your competitors. By adopting a different business model, your company can find a market name that creates interest among consumers and encourages them to buy for the first time.',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Ftxt3.png?alt=media&token=b7f0f14f-5378-40fb-afe9-e0086253d7c1',
         type: 'textimg',
       },
       {
         text: 'Creating value for both customers and the business must be an ongoing strategy for a successful business model. Therefore, even established companies need to constantly evaluate and refine their business models.',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Ftxt3.png?alt=media&token=b7f0f14f-5378-40fb-afe9-e0086253d7c1',
         type: 'textimg',
       },
       {
         question: 'How does a business model canvas help?',
         options: [
           'Gives you complete overview of your business idea at all angels',
           'Gives you competitive edge in the industry',
           'Creates value for both customers and business.',
           'All of the above',
         ],
         ans: 3,
         type: 'quiz',
       },
       {
         text: 'The way a company creates value is defined by its business model. Business power can melt in its simple essence through this process. An effective business model answers questions about what the business will solve, how it will solve it, and market opportunity.',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2FLayer%204.png?alt=media&token=81be0317-e813-47eb-8205-4496912ae1e0',
         type: 'textimg',
       },
       {
         text: 'Value is created by the development and management of business models. Based on key elements of stakeholder theory, it provides a framework based on stakeholder vision for generating a number of participants.',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2FLayer%204.png?alt=media&token=81be0317-e813-47eb-8205-4496912ae1e0',
         type: 'textimg',
       },
       ]
      }
     ],
    description:
      'The course description orients students by outlining the rationale for the course subject or theme, framing a brief overview of the key content, knowledge and skills to be learned and',
    image:
      'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 1,
    title: 'Product Development',
    modules: [
      {
       module:1,
       slides:[
       {
         heading: 'Product Roadmap',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Froadmap.png?alt=media&token=6dc98b81-2830-4007-83dd-91d6258c6405',
         type: 'intro',
       },
       {
        heading: 'Product Roadmap:',
        text: 'A product roadmap is a sophisticated visual that depicts your product`s progression over a foreseeable period of time. The product roadmap outlines where the company is now, where it wants to go, and how it will get there. It is a great resource for teams to plan tasks and carry out the strategy.',
        image:
          'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Fproduct%20planning%20discussion.png?alt=media&token=de042edf-d689-449a-9fef-3fdfe1c6d449',
        type: 'headtextimg',
      },
       {
         text: 'Product roadmaps can be used in conjunction with other business strategies such as marketing and business plans. They can even assist you in developing a marketing growth strategy.',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Fproduct%20planning%20discussion.png?alt=media&token=de042edf-d689-449a-9fef-3fdfe1c6d449',
         type: 'textimg',
       },
       {
        heading: 'Planning a product roadmap:',
        text: 'Because different audiences` needs  and demands will vary, the information and structure of your plan must be adjusted to them.',
        image:
          'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Fproduct%20planning%20or%20strategy.png?alt=media&token=1b3cd3f2-6cb7-4eb9-8232-5f92833748c0',
        type: 'headtextimg',
      },
      {
        text: 'External stakeholders, for example, would most certainly need a high-level overview of strategic initiatives, which should be planned out across several quarters to a few years. They might be more interested in long-term, medium-term, and long-term time horizons.',
        image:
          'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Fproduct%20planning%20or%20strategy.png?alt=media&token=1b3cd3f2-6cb7-4eb9-8232-5f92833748c0',
        type: 'textimg',
      },
      {
        text: 'Internal product team members, on the other hand, will require a more detailed picture of certain features and tasks. Instead of years, it`s usually better to plan these out over a few weeks or months.        ',
        image:
          'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Fproduct%20planning%20or%20strategy.png?alt=media&token=1b3cd3f2-6cb7-4eb9-8232-5f92833748c0',
        type: 'textimg',
      },
       {
         question: 'A product roadmap is………',
         options: [
           'a sophisticated visual that depicts your stock`s progression over a foreseeable period of time. ',
           'a sophisticated visual that depicts your company`s progression over a foreseeable period of time.',
           'a sophisticated visual that depicts your product`s progression over a foreseeable period of time. ',
           'none of these',
         ],
         ans: 2,
         type: 'quiz',
       },
       {
        text: 'The timescale must be fair in addition to aligning with the needs of your audience. It must be long enough to achieve major project developments while being short enough to estimate accurate timelines.',
        image:
          'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Fwww.png?alt=media&token=7c0db447-752d-42d6-9d1d-8190033bfde9',
        type: 'textimg',
      },
       {
         heading: '',
         text: 'You may start putting things into place about the product development once you`ve identified your target customer and set an acceptable deadline. This includes the following:',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Fproduct%20planning%20discussion.png?alt=media&token=de042edf-d689-449a-9fef-3fdfe1c6d449',
         points: [
           'High-level goals and initiatives',
           'Low-level tasks and their time requirements',
           'Task priorities',
           'Key milestones',
           'Task dependencies',
         ],
         type: 'headtextimgpoints',
       },
       {
        text: 'A product roadmap can improve communication within an organization, resulting in better alignment within and among teams, and allowing for more real work to be completed.',
        image:
          'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Fwww.png?alt=media&token=7c0db447-752d-42d6-9d1d-8190033bfde9',
        type: 'textimg',
      },
      {
        question: 'A product roadmap includes which of the following features?',
        options: [
          'Can improve communication within an organization',
          'Resulting in better alignment within and among teams',
          'Allowing for more real work to be completed.  ',
          'all of these',
        ],
        ans: 3,
        type: 'quiz',
      },]
      },
      {
       module:2,
       slides:[
       {
         heading: 'Minimum Viable Product',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2FRectangle.png?alt=media&token=1d744571-6986-416a-8364-436e4660c327',
         type: 'intro',
       },
       {
         text: 'So, you have this brilliant idea that has piqued your curiosity. It may or may not have the same effect on the other persons to whom you will present your project. That is why people participate in MVPs. To quickly test something, construct it and receive comments to see if you should continue. You may be thrilled with the concept!         ',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2FWoman%20thinking%20of%20investment.png?alt=media&token=9d6277d4-5336-48ef-931e-d0ac56ccdb4f',
         type: 'textimg',
       },
       {
         text: 'A minimum viable product (MVP) is a concept that emphasizes the importance of learning in product development. An MVP is a version of a new product that allows a team to collect the most amount of validated customer learning with the least amount of effort. This verified knowledge is in the form of whether or not your clients will actually buy your product.',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2FRectangle.png?alt=media&token=1d744571-6986-416a-8364-436e4660c327',
         type: 'textimg',
       },
       {
        text: 'A crucial premise behind the MVP concept is that you create an actual product (which might be as simple as a landing page or a service that appears to be automated but is entirely manual behind the scenes) that you can give to clients and monitor their conduct with it. Observing what people do with a product rather than asking them what they would do is far more reliable.        ',
        image:
          'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Fimage%205.png?alt=media&token=379de148-e1be-423d-801b-b87430cdced6',
        type: 'textimg',
      },
       {
         question: 'What is the full form of MVP?',
         options: [
           'Master Vulnerable Product',
           'Maximum Visible Product',
           'Minimum Viable Product',
           'None of these',
         ],
         ans: 2,
         type: 'quiz',
       },
       {
        heading: 'Expected Benefits',
        image:
          'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Fint2.png?alt=media&token=4f27db8b-7d24-404e-9916-50a7c7d14b22',
        type: 'intro',
      },
      {
        text: 'The main advantage of an MVP is that it allows you to learn about your clients` interest in your product without having to fully construct it. The sooner you can determine whether your product will appeal to clients, the less time and money you`ll waste on a product that won`t sell.',
        image:
          'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2FGroup%202907.png?alt=media&token=e3143ca5-929d-4351-b246-634df21881bf',
        type: 'textimg',
      },
      {
        heading: 'Common Pitfalls :',
        text: '',
        image:
          'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2FConcept%20about%20business%20Failure.png?alt=media&token=530a97d3-16ba-49fa-a3f6-997b4d99ca8e',
        points: [
          'Why is it so minimal?',
          'Consider the concept you want to develop.',
          'How many days should you devote to developing a working prototype?',
        ],
        type: 'headtextimgpoints',
      },
      {
        text: 'Let`s do the math:4 functionalities, plus 3 integrations, and the ability to pay in all countries, and one more feature to display cool metrics, and an awesome user interface, and..., and... It would take you 9 months, hmm. Alright! It took you 13 months to construct (some unexpected adjustments here and there). You put it out to an alpha test and discovered that no one is interested.',
        image:
          'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Ffinancial%20year.png?alt=media&token=b91285e6-f69b-41ca-a0d4-05bb4fe844e0',
        type: 'textimg',
      },
      {
        text: 'You may argue that it`s due to a lack of adequate market research. You identified the private households in a village as your target market. You spoke with a number of them and inquired about the problem you were attempting to solve.',
        image:
          'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Ffinancial%20year.png?alt=media&token=b91285e6-f69b-41ca-a0d4-05bb4fe844e0',
        type: 'textimg',
      },
      {
        question: 'The main advantage of an MVP is',
        options: [
          'that it allows you to learn about your clients` interest in your product without having to fully construct it.          ',
          'Can improve communication within an organization          ',
          'Resulting in better alignment within and among teams',
          'Allowing for more real work to be completed.',
        ],
        ans: 0,
        type: 'quiz',
      },
      {
        text: 'So you`ve concluded that spending 13 months constructing a solution is acceptable. You then exhibited it to your target potential clients, who discovered that your solution does not solve their problem. Okay, you gathered feedback and corrected your MVP in two months.',
        image:
          'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2FGroup%202906.png?alt=media&token=37617609-d496-4ee1-9f65-4346f681d528',
        type: 'textimg',
      },
      {
        text: ' Then, over the course of a year, you repeated the release-receive feedback cycle a few times to get a few people interested in using your solution. So, simply to get started, it`ll take at least two years.',
        image:
          'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2FGroup%202906.png?alt=media&token=37617609-d496-4ee1-9f65-4346f681d528',
        type: 'textimg',
      },
      {
        text: 'The MVP concept`s key goal is to adapt quickly.  You build something quickly, show it to potential users, get feedback on what`s wrong, and make changes as needed. Repeat this process until you have a few users. Then some more until you have a product-market fit and your scaling issue is solved.',
        image:
          'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2FBusiness%20woman%20achieving%20the%20goal%20successfully.png?alt=media&token=c297beac-a483-40b5-bf74-c4238b9071ea',
        type: 'textimg',
      },
      {
        question: 'The correct order for product development process is ? 1.Build something quickly 2.Repeat this process until you have a few users.3.Show it to potential users ,get feedback and make changes as needed.',
        options: [
          '1>2>3',
          '1>3>2',
          '3>2>1',
          '3>1>2',
        ],
        ans: 1,
        type: 'quiz',
      },
      {
        heading: 'Potential Costs',
        image:
          'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Fstrategy%20or%20planning.png?alt=media&token=63e40e25-4f55-4e07-b33c-da470d38f326',
        type: 'intro',
      },
      {
        text: 'When an MVP is used correctly, a team can drastically alter a product that they give to their clients or drop the product altogether based on customer feedback. MVP encourages teams to undertake the least amount of effort possible to get relevant feedback, which helps them avoid working on a product that no one wants. ',
        image:
          'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Fstrategy%20or%20planning.png?alt=media&token=63e40e25-4f55-4e07-b33c-da470d38f326',
        type: 'textimg',
      }]},
      {
        module:3,
        slides:[
        {
          heading: 'Designing',
          image:
            'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Fdrawing.png?alt=media&token=d0e183d0-8c66-4c2b-8023-5db8c0c71eb1',
          type: 'intro',
        },
        {
          text: 'So, you have this brilliant idea that has piqued your curiosity. It may or may not have the same effect on the other persons to whom you will present your project. That is why people participate in MVPs. To quickly test something, construct it and receive comments to see if you should continue. You may be thrilled with the concept!         ',
          image:
            'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2FWoman%20thinking%20of%20investment.png?alt=media&token=9d6277d4-5336-48ef-931e-d0ac56ccdb4f',
          type: 'textimg',
        },
        {
          text: 'A minimum viable product (MVP) is a concept that emphasizes the importance of learning in product development. An MVP is a version of a new product that allows a team to collect the most amount of validated customer learning with the least amount of effort. This verified knowledge is in the form of whether or not your clients will actually buy your product.',
          image:
            'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2FRectangle.png?alt=media&token=1d744571-6986-416a-8364-436e4660c327',
          type: 'textimg',
        },
        {
         text: 'A crucial premise behind the MVP concept is that you create an actual product (which might be as simple as a landing page or a service that appears to be automated but is entirely manual behind the scenes) that you can give to clients and monitor their conduct with it. Observing what people do with a product rather than asking them what they would do is far more reliable.        ',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Fimage%205.png?alt=media&token=379de148-e1be-423d-801b-b87430cdced6',
         type: 'textimg',
       },
        {
          question: 'What is the full form of MVP?',
          options: [
            'Master Vulnerable Product',
            'Maximum Visible Product',
            'Minimum Viable Product',
            'None of these',
          ],
          ans: 2,
          type: 'quiz',
        },
        {
         heading: 'Expected Benefits',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Fint2.png?alt=media&token=4f27db8b-7d24-404e-9916-50a7c7d14b22',
         type: 'intro',
       },
       {
         text: 'The main advantage of an MVP is that it allows you to learn about your clients` interest in your product without having to fully construct it. The sooner you can determine whether your product will appeal to clients, the less time and money you`ll waste on a product that won`t sell.',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2FGroup%202907.png?alt=media&token=e3143ca5-929d-4351-b246-634df21881bf',
         type: 'textimg',
       },
       {
         heading: 'Common Pitfalls :',
         text: '',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2FConcept%20about%20business%20Failure.png?alt=media&token=530a97d3-16ba-49fa-a3f6-997b4d99ca8e',
         points: [
           'Why is it so minimal?',
           'Consider the concept you want to develop.',
           'How many days should you devote to developing a working prototype?',
         ],
         type: 'headtextimgpoints',
       },
       {
         text: 'Let`s do the math:4 functionalities, plus 3 integrations, and the ability to pay in all countries, and one more feature to display cool metrics, and an awesome user interface, and..., and... It would take you 9 months, hmm. Alright! It took you 13 months to construct (some unexpected adjustments here and there). You put it out to an alpha test and discovered that no one is interested.',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Ffinancial%20year.png?alt=media&token=b91285e6-f69b-41ca-a0d4-05bb4fe844e0',
         type: 'textimg',
       },
       {
         text: 'You may argue that it`s due to a lack of adequate market research. You identified the private households in a village as your target market. You spoke with a number of them and inquired about the problem you were attempting to solve.',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Ffinancial%20year.png?alt=media&token=b91285e6-f69b-41ca-a0d4-05bb4fe844e0',
         type: 'textimg',
       },
       {
         question: 'The main advantage of an MVP is',
         options: [
           'that it allows you to learn about your clients` interest in your product without having to fully construct it.          ',
           'Can improve communication within an organization          ',
           'Resulting in better alignment within and among teams',
           'Allowing for more real work to be completed.',
         ],
         ans: 0,
         type: 'quiz',
       },
       {
         text: 'So you`ve concluded that spending 13 months constructing a solution is acceptable. You then exhibited it to your target potential clients, who discovered that your solution does not solve their problem. Okay, you gathered feedback and corrected your MVP in two months.',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2FGroup%202906.png?alt=media&token=37617609-d496-4ee1-9f65-4346f681d528',
         type: 'textimg',
       },
       {
         text: ' Then, over the course of a year, you repeated the release-receive feedback cycle a few times to get a few people interested in using your solution. So, simply to get started, it`ll take at least two years.',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2FGroup%202906.png?alt=media&token=37617609-d496-4ee1-9f65-4346f681d528',
         type: 'textimg',
       },
       {
         text: 'The MVP concept`s key goal is to adapt quickly.  You build something quickly, show it to potential users, get feedback on what`s wrong, and make changes as needed. Repeat this process until you have a few users. Then some more until you have a product-market fit and your scaling issue is solved.',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2FBusiness%20woman%20achieving%20the%20goal%20successfully.png?alt=media&token=c297beac-a483-40b5-bf74-c4238b9071ea',
         type: 'textimg',
       },
       {
         question: 'The correct order for product development process is ? 1.Build something quickly 2.Repeat this process until you have a few users.3.Show it to potential users ,get feedback and make changes as needed.',
         options: [
           '1>2>3',
           '1>3>2',
           '3>2>1',
           '3>1>2',
         ],
         ans: 1,
         type: 'quiz',
       },
       {
         heading: 'Potential Costs',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Fstrategy%20or%20planning.png?alt=media&token=63e40e25-4f55-4e07-b33c-da470d38f326',
         type: 'intro',
       },
       {
         text: 'When an MVP is used correctly, a team can drastically alter a product that they give to their clients or drop the product altogether based on customer feedback. MVP encourages teams to undertake the least amount of effort possible to get relevant feedback, which helps them avoid working on a product that no one wants. ',
         image:
           'https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/courses%2Fstrategy%20or%20planning.png?alt=media&token=63e40e25-4f55-4e07-b33c-da470d38f326',
         type: 'textimg',
       },]}

     ],
    description:
      'The course description orients students by outlining the rationale for the course subject or theme, framing a brief overview of the key content, knowledge and skills to be learned and',
    image:
      'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 1,
    title: 'Cryptocurrency Trading and Investing For beginners.',
    book: [
      {
        chapter: 1,
        chapterTitle: 'Web Development',
        complete: '65%',
        page: [
          {
            number: 1,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 2,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 3,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 4,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 5,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
        ],
      },
      {
        chapter: 2,
        chapterTitle: 'Web Development',
        complete: '65%',
        page: [
          {
            number: 1,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 2,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 3,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 4,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 5,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
        ],
      },
      {
        chapter: 3,
        chapterTitle: 'Web Development',
        complete: '65%',
        page: [
          {
            number: 1,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 2,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 3,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 4,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 5,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
        ],
      },
      {
        chapter: 4,
        chapterTitle: 'Web Development',
        complete: '65%',
        page: [
          {
            number: 1,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 2,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 3,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 4,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 5,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
        ],
      },
    ],
    description:
      'The course description orients students by outlining the rationale for the course subject or theme, framing a brief overview of the key content, knowledge and skills to be learned and',

    image:
      'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 2,
    title: 'Cryptocurrency Trading and Investing For beginners.',
    book: [
      {
        chapter: 1,
        chapterTitle: 'Web Development',
        complete: '65%',
        page: [
          {
            number: 1,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 2,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 3,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 4,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 5,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
        ],
      },
      {
        chapter: 2,
        chapterTitle: 'Web Development',
        complete: '65%',
        page: [
          {
            number: 1,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 2,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 3,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 4,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 5,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
        ],
      },
      {
        chapter: 3,
        chapterTitle: 'Web Development',
        complete: '65%',
        page: [
          {
            number: 1,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 2,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 3,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 4,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 5,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
        ],
      },
      {
        chapter: 4,
        chapterTitle: 'Web Development',
        complete: '65%',
        page: [
          {
            number: 1,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 2,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 3,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 4,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
          {
            number: 5,
            content:
              'That’s why whenever I come across a good article, I bookmark it just to read it again and again, and believe me, I have learned a thing or two every time I have learned those. Sometimes, a new insightful comment also leads to a new resource or add something you already know.',
          },
        ],
      },
    ],
    description:
      'The course description orients students by outlining the rationale for the course subject or theme, framing a brief overview of the key content, knowledge and skills to be learned and',

    image:
      'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];
