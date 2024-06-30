'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let skillsData = []
    const skills = [
      'JavaScript', 'Node.js', 'React.js', 'Angular', 'Vue.js', 'Python', 'Django', 'Flask', 'Java', 'Spring Boot',
      'Kotlin', 'Swift', 'Objective-C', 'C#', 'ASP.NET', 'PHP', 'Laravel', 'Symfony', 'Ruby', 'Ruby on Rails',
      'C++', 'C', 'Go', 'Rust', 'Perl', 'Scala', 'Haskell', 'TypeScript', 'HTML', 'CSS', 'Sass', 'Less', 'Bootstrap',
      'Material UI', 'Tailwind CSS', 'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Redis', 'Elasticsearch', 'GraphQL',
      'REST API', 'WebSocket', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Firebase', 'Git', 'SVN', 'Jira',
      'Confluence', 'Agile Methodologies', 'Scrum', 'Kanban', 'Continuous Integration', 'Continuous Deployment',
      'Unit Testing', 'Integration Testing', 'End-to-End Testing', 'UI/UX Design', 'Responsive Design', 'Mobile Development',
      'Web Development', 'Backend Development', 'Frontend Development', 'Full-stack Development', 'DevOps', 'CI/CD Pipelines',
      'Microservices', 'Serverless Architecture', 'Containerization', 'Data Structures', 'Algorithms', 'Machine Learning',
      'Deep Learning', 'Data Science', 'Big Data', 'Artificial Intelligence', 'Natural Language Processing', 'Computer Vision',
      'Blockchain', 'Cryptocurrency', 'Smart Contracts', 'IoT', 'AR/VR Development', 'Game Development', 'UI Frameworks',
      'UI Libraries', 'API Design', 'Performance Optimization', 'Security Engineering', 'Cloud Architecture',
      'Database Design', 'Software Architecture', 'Software Engineering', 'Project Management', 'Technical Documentation',
      'Troubleshooting', 'Customer Support', 'Team Leadership', 'Collaboration', 'Communication Skills', 'Time Management',
      'Presentation Skills', 'Problem Solving', 'Critical Thinking', 'Creativity', 'Adaptability', 'Attention to Detail',
      'Analytical Skills', 'Decision Making', 'Negotiation Skills', 'Risk Management', 'Financial Analysis', 'Marketing Strategy',
      'Sales Skills', 'Business Development', 'Entrepreneurship', 'Public Speaking', 'Content Writing', 'Copywriting',
      'SEO', 'SEM', 'Social Media Marketing', 'Email Marketing', 'Graphic Design', 'Video Production', 'Photography'
    ];
    
   
    
    // Генерация 150 скиллов
    for (let i = 0; i < skills.length; i++) {
      skillsData.push({name: skills[i] });
    }

    // Вставка данных в таблицу Skills
    await queryInterface.bulkInsert('Skills', skillsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Удаление всех данных из таблицы Skills
    await queryInterface.bulkDelete('Skills', null, {});
  }
};

