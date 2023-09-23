
import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin,FaInstagram } from 'react-icons/fa';

function About() {
  const teamMembers = [
    { name: 'Aditya', role: 'Fontent Manager', image: 'https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg', social: { facebook: '#', twitter: '#', linkedin: '#' } },
    { name: 'Abhishek', role: 'Backend Manager', image: 'https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg', social: { facebook: '#', twitter: '#', linkedin: '#' } },
    { name: 'Anjali', role: 'Designer', image: 'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ', social: { facebook: '#', twitter: '#', linkedin: '#' } },
    { name: 'Dimpy', role: 'Database Manager', image: 'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ', social: { facebook: '#', twitter: '#', linkedin: '#' } },
    { name: 'Ayush', role: 'Frontent Helper', image: 'https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg', social: { facebook: '#', twitter: '#', linkedin: '#' } },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Top Section with Image and Text Overlay */}
      <div className="relative h-96">
        <img
          src="https://media.istockphoto.com/id/1062933252/photo/legal-advice-service-concept-with-lawyer-working-for-justice-law-business-legislation-and.jpg?s=612x612&w=0&k=20&c=KUbSd05rSSgbPNfRoogdaiGYkExurmDUJMpXQ7d5OlM="
          alt="Company Office"
          className="w-full h-full object-fit: cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-4">
            About US
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl">
            We are dedicated to providing exceptional services to our clients.
          </p>
        </div>
      </div>
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">MEET OUR TEAM</h2>
          <p className="text-gray-600 mt-3">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy.
                    </p>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 mt-12 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-4 rounded shadow-md hover:shadow-lg transform hover:translate-y-2 transition duration-300 ease-in-out">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
                <div className="flex justify-center mt-4 space-x-4">
                  <a href={member.social.facebook} target="_blank" rel="noopener noreferrer">
                    <FaFacebook size={24} style={{ color: '#1877F2' }} />
                  </a>
                  <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                    <FaTwitter size={24} style={{ color: '#1DA1F2' }} />
                  </a>
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin size={24} style={{ color: '#0A66C2' }} />
                  </a>
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={24} color="#E4405F"/>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;

