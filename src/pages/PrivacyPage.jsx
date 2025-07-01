import { Shield, Eye, Lock, Users, FileText, Phone } from "lucide-react"

const PrivacyPage = () => {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      icon: FileText,
      content: `Welcome to FoodieApp. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website or use our mobile application and tell you about your privacy rights and how the law protects you.`,
    },
    {
      id: "information-we-collect",
      title: "Information We Collect",
      icon: Eye,
      content: `We collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
      
      • Identity Data: includes first name, last name, username or similar identifier
      • Contact Data: includes billing address, delivery address, email address and telephone numbers
      • Financial Data: includes bank account and payment card details
      • Transaction Data: includes details about payments to and from you and other details of products and services you have purchased from us
      • Technical Data: includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform
      • Profile Data: includes your username and password, purchases or orders made by you, your interests, preferences, feedback and survey responses
      • Usage Data: includes information about how you use our website, products and services
      • Marketing and Communications Data: includes your preferences in receiving marketing from us and our third parties and your communication preferences`,
    },
    {
      id: "how-we-use-information",
      title: "How We Use Information",
      icon: Users,
      content: `We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
      
      • To register you as a new customer
      • To process and deliver your order including managing payments, fees and charges, and collecting and recovering money owed to us
      • To manage our relationship with you which will include notifying you about changes to our terms or privacy policy and asking you to leave a review or take a survey
      • To enable you to partake in a prize draw, competition or complete a survey
      • To administer and protect our business and this website (including troubleshooting, data analysis, testing, system maintenance, support, reporting and hosting of data)
      • To deliver relevant website content and advertisements to you and measure or understand the effectiveness of the advertising we serve to you
      • To use data analytics to improve our website, products/services, marketing, customer relationships and experiences
      • To make suggestions and recommendations to you about goods or services that may be of interest to you`,
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Lock,
      content: `We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
      
      We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.`,
    },
    {
      id: "cookies-tracking",
      title: "Cookies & Tracking",
      icon: Shield,
      content: `Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.
      
      A cookie is a small file of letters and numbers that we store on your browser or the hard drive of your computer if you agree. Cookies contain information that is transferred to your computer's hard drive.
      
      We use the following cookies:
      • Strictly necessary cookies: These are cookies that are required for the operation of our website
      • Analytical/performance cookies: They allow us to recognise and count the number of visitors and to see how visitors move around our website
      • Functionality cookies: These are used to recognise you when you return to our website
      • Targeting cookies: These cookies record your visit to our website, the pages you have visited and the links you have followed`,
    },
    {
      id: "user-rights",
      title: "User Rights & Choices",
      icon: Users,
      content: `Under certain circumstances, you have rights under data protection laws in relation to your personal data:
      
      • Request access to your personal data (commonly known as a "data subject access request")
      • Request correction of the personal data that we hold about you
      • Request erasure of your personal data
      • Object to processing of your personal data where we are relying on a legitimate interest
      • Request restriction of processing of your personal data
      • Request transfer of your personal data to you or to a third party
      • Withdraw consent at any time where we are relying on consent to process your personal data
      
      If you wish to exercise any of the rights set out above, please contact us using the details provided in the contact section below.`,
    },
    {
      id: "contact",
      title: "Contact for Privacy Concerns",
      icon: Phone,
      content: `If you have any questions about this privacy policy or our privacy practices, please contact us:
      
      Email: privacy@foodieapp.com
      Phone: +1 (555) 123-4567
      Address: 123 Food Street, Downtown District, New York, NY 10001
      
      We will respond to your inquiry within 30 days. If you are not satisfied with our response, you have the right to make a complaint to the relevant data protection authority.`,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in slide-in-from-bottom duration-1000">
            Privacy Policy
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto animate-in slide-in-from-bottom duration-1000 delay-200">
            Your privacy is important to us. Learn how we protect your data.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Last Updated */}
        <div className="text-center mb-12 animate-in slide-in-from-bottom duration-1000">
          <p className="text-gray-600">Last updated: January 1, 2024</p>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 animate-in slide-in-from-bottom duration-1000 delay-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <section.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 group-hover:text-orange-500 transition-colors duration-200">
                  {section.title}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Privacy Policy Sections */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <div
              key={section.id}
              id={section.id}
              className="bg-white rounded-2xl shadow-lg p-8 animate-in slide-in-from-bottom duration-1000"
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
              </div>
              <div className="prose prose-gray max-w-none">
                <div className="text-gray-600 leading-relaxed whitespace-pre-line">{section.content}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 text-center animate-in slide-in-from-bottom duration-1000">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Questions About Our Privacy Policy?</h3>
          <p className="text-gray-600 mb-6">
            If you have any questions or concerns about our privacy practices, don't hesitate to reach out to us.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
          >
            <Phone className="w-5 h-5" />
            <span>Contact Us</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage
