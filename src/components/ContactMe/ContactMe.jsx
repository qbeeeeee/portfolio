import React, { useState } from 'react'
import "./../../assets/css/custom.css"
import "./../../assets/css/projectsSectionCss.css"
import LinkedinIcon from "../../assets/contactme/linkedinCircle.svg?react";
import GmailIcon from "../../assets/contactme/gmailCircle.svg?react";
import WhatsappCircle from "../../assets/contactme/whatsappCircle.svg?react";
import WhatsappGreen from "../../assets/contactme/whatsappGreen.svg?react";
import LinkedinBlue from "../../assets/contactme/linkedinBlue.svg?react";
import ViberPurple from "../../assets/contactme/viberCirclecolor.svg?react";

const ContactMe = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <div className='min-h-screen w-full mt-[40vh] flex flex-col items-center'>

        <div className='text-white text-[25vh] whitespace-nowrap font-ica-rubrik leading-[30vh]'>
            Contact Me
        </div>

        <div className='w-full flex justify-around mt-20 px-20'>
            <div className='w-[20%] max-w-xl text-white flex flex-col gap-6 z-10'>
                <div>
                    <p>Email</p>
                    <p>Papadokonst1998@gmail.com</p>
                </div>

                <div>
                    <p>Phone</p>
                    <p>+30 6972358102</p>
                </div>

                <div className='flex items-center gap-6'>
                    <LinkedinBlue className="w-8 h-8 text-white" />

                    <GmailIcon className="w-8 h-8 text-white" />
                    
                    <WhatsappGreen className="w-8 h-8 text-white" />
                    
                    <ViberPurple className="w-8 h-8 text-white" />
                </div>
            </div>

            <form 
                onSubmit={handleSubmit}
                className="w-[40%] flex flex-col gap-6 text-white z-10"
            >

            <div className="flex gap-4">
                <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-1/2 p-3 bg-transparent border-b border-l border-white/30 rounded-md outline-none"
                required
                />

                <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-1/2 p-3 bg-transparent border-b border-l border-white/30 rounded-md outline-none"
                required
                />
            </div>

            <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="p-3 bg-transparent border-b border-l border-white/30 rounded-md outline-none"
                required
            />

            <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="p-3 bg-transparent border-b border-l border-white/30 rounded-md outline-none resize-none"
                required
            />

            <button
                type="submit"
                className="projectViewButton"
            >
                Send Message
            </button>
            </form>
        </div>
    </div>
  )
}

export default ContactMe