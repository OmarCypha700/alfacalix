/**
 * Central services configuration. Only list services that are confirmed as
 * available. `icon` names map to Lucide icons in components/services/ServiceIcon.js.
 */

export const services = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    icon: "Braces",
    summary:
      "We design and develop tailored software applications based on the unique requirements of businesses and institutions. Our approach focuses on functionality, usability, scalability and long-term value.",
    detail:
      "When off-the-shelf tools do not fit the way your organisation works, custom software can. We work with you to understand your processes and requirements, then design and build an application around them, with careful attention to how people will actually use it and how it can grow with your organisation.",
    suitedFor: [
      "Processes that are still manual, paper-based or spread across spreadsheets",
      "Organisations whose requirements are not met by existing software",
      "Teams that need a system shaped around their own workflows",
    ],
  },
  {
    slug: "web-application-development",
    title: "Web Application Development",
    icon: "AppWindow",
    summary:
      "We build modern, responsive and secure web applications that help organisations digitise services, automate processes and improve accessibility.",
    detail:
      "Web applications let staff, clients and stakeholders access services from a browser on any device, without installing software. We build responsive web applications that bring services online, reduce repetitive manual work and make information easier to reach.",
    suitedFor: [
      "Moving an in-person or paper-based service online",
      "Giving users secure, role-appropriate access from anywhere",
      "Replacing disconnected tools with one accessible platform",
    ],
  },
  {
    slug: "institutional-systems-development",
    title: "Institutional Systems Development",
    icon: "GraduationCap",
    summary:
      "We develop digital platforms that support institutional operations, academic administration, student information management and other specialised organisational processes.",
    detail:
      "Educational and other institutions run specialised processes that general-purpose tools rarely handle well. Drawing on the experience of building our own institutional products, we develop platforms for academic administration, student information management and other operations specific to your institution.",
    suitedFor: [
      "Universities, colleges, schools and training institutions",
      "Academic administration and registry processes",
      "Specialised institutional workflows",
    ],
  },
  {
    slug: "website-design-and-development",
    title: "Website Design and Development",
    icon: "Globe",
    summary:
      "We create professional, responsive websites that strengthen organisational identity, improve online visibility and provide effective digital communication channels.",
    detail:
      "Your website is often the first place people learn about your organisation. We design and develop professional websites that present your organisation clearly, work well on phones and desktops, and are built with search visibility and performance in mind.",
    suitedFor: [
      "Organisations establishing or refreshing their online presence",
      "Institutions that need a clear, accessible public website",
      "Businesses that want to be found more easily online",
    ],
  },
  {
    slug: "systems-integration-and-process-automation",
    title: "Systems Integration and Process Automation",
    icon: "Workflow",
    summary:
      "We help organisations connect digital systems and streamline repetitive processes through practical integration and automation solutions.",
    detail:
      "Many organisations use several systems that do not talk to each other, leading to duplicated data entry and avoidable errors. We help connect those systems where practical and automate repetitive steps, so information flows more smoothly and staff can focus on higher-value work.",
    suitedFor: [
      "Teams re-entering the same information into multiple systems",
      "Repetitive, rules-based tasks that slow staff down",
      "Organisations looking to make existing systems work together",
    ],
  },
  {
    slug: "software-maintenance-and-technical-support",
    title: "Software Maintenance and Technical Support",
    icon: "LifeBuoy",
    summary:
      "We provide technical support, maintenance and continuous improvement services to help software systems remain reliable, functional and relevant.",
    detail:
      "Software needs care after launch. We provide technical support, fix issues, keep systems up to date and make continuous improvements as your needs change, helping your software remain reliable and useful over time.",
    suitedFor: [
      "Organisations relying on software for day-to-day operations",
      "Systems that need ongoing updates and improvements",
      "Teams that want a dependable technical support partner",
    ],
  },
];
