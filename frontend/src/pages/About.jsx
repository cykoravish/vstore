"use client"

import { motion } from "framer-motion"
import { Users, Award, Globe, Heart } from "lucide-react"

const About = () => {
  const stats = [
    { icon: Users, label: "Happy Customers", value: "50,000+" },
    { icon: Award, label: "Years of Excellence", value: "10+" },
    { icon: Globe, label: "Countries Served", value: "25+" },
    { icon: Heart, label: "Products Sold", value: "1M+" },
  ]

  const team = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      image: "/placeholder.svg?height=300&width=300",
      description: "Visionary leader with 15+ years in e-commerce",
    },
    {
      name: "Sarah Johnson",
      role: "Head of Operations",
      image: "/placeholder.svg?height=300&width=300",
      description: "Operations expert ensuring smooth customer experience",
    },
    {
      name: "Mike Chen",
      role: "Technology Director",
      image: "/placeholder.svg?height=300&width=300",
      description: "Tech innovator driving our digital transformation",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-orange-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">About VStore</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're passionate about bringing you the best products at unbeatable prices. Our mission is to make online
              shopping simple, secure, and enjoyable for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-orange-600" />
                </div>
                <div className="font-heading font-bold text-3xl text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2014, VStore began as a small startup with a big dream: to revolutionize online shopping by
                  making quality products accessible to everyone, everywhere.
                </p>
                <p>
                  What started as a passion project has grown into a trusted platform serving millions of customers
                  worldwide. We've built our reputation on three core principles: quality, affordability, and
                  exceptional customer service.
                </p>
                <p>
                  Today, we continue to innovate and expand our offerings, always keeping our customers at the heart of
                  everything we do. From electronics to fashion, home goods to sports equipment, we're your one-stop
                  destination for all your shopping needs.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Our Story"
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate people behind VStore who work tirelessly to bring you the best shopping experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6 text-center"
              >
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-heading font-semibold text-xl text-gray-900 mb-2">{member.name}</h3>
                <p className="text-orange-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at VStore
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Quality First",
                description:
                  "We carefully curate every product to ensure it meets our high standards of quality and value.",
              },
              {
                title: "Customer Focused",
                description:
                  "Your satisfaction is our priority. We listen, learn, and continuously improve based on your feedback.",
              },
              {
                title: "Innovation",
                description: "We embrace new technologies and ideas to make your shopping experience better every day.",
              },
              {
                title: "Transparency",
                description: "Honest pricing, clear policies, and open communication in everything we do.",
              },
              {
                title: "Sustainability",
                description:
                  "We're committed to responsible business practices that protect our planet for future generations.",
              },
              {
                title: "Community",
                description:
                  "Building lasting relationships with our customers, partners, and the communities we serve.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h3 className="font-heading font-semibold text-xl text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
