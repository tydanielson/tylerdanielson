import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Typography, Box, Tab, Tabs, Paper, Link, Chip } from '@mui/material';
import { LinkedIn, GitHub, Work, School, Code, Build, Psychology, Speed, Person } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e40af', // Deeper blue for better harmony
      light: '#3b82f6',
      dark: '#1e3a8a',
    },
    secondary: {
      main: '#0f766e', // Closer teal that harmonizes better with blue
      light: '#14b8a6',
      dark: '#134e4a',
    },
    background: {
      default: '#ffffff',
      paper: '#f8fafc',
    },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            mb: 4, 
            textAlign: 'center',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            border: '1px solid #e2e8f0',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px -8px rgba(37, 99, 235, 0.2)',
            }
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom color="primary">
            Tyler Scott Danielson
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Chief Executive Officer & Technology Leader
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: '800px', mx: 'auto' }}>
            Highly accomplished strategic leader with 15+ years of experience steering organizational technological operations, 
            large teams, and special projects. Former Interim CEO of a public company (NYSEAM:FOXO) and current Co-founder & CTO 
            of a stealth AI startup focused on enterprise automation and intelligent solutions.
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Link href="https://www.linkedin.com/in/tylerdanielson/" target="_blank" rel="noopener">
              <Chip icon={<LinkedIn />} label="LinkedIn" clickable color="primary" />
            </Link>
            <Link href="https://github.com/tydanielson" target="_blank" rel="noopener">
              <Chip icon={<GitHub />} label="GitHub" clickable color="primary" />
            </Link>
          </Box>
        </Paper>

        {/* Navigation Tabs */}
        <Paper 
          elevation={0} 
          sx={{ 
            mb: 3,
            border: '1px solid #e2e8f0',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="About" icon={<Work />} />
            <Tab label="Education" icon={<School />} />
            <Tab label="Skills" icon={<Build />} />
            <Tab label="Projects" icon={<Code />} />
            <Tab label="Leadership" icon={<Person />} />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        <Paper 
          elevation={0}
          sx={{ 
            border: '1px solid #e2e8f0',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <TabPanel value={value} index={0}>
            <Typography variant="h4" gutterBottom color="primary">
              Professional Experience
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ 
                p: 4, 
                borderRadius: 3,
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                color: 'white',
                boxShadow: '0 8px 32px rgba(30, 64, 175, 0.15)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                  transition: 'left 0.6s ease-in-out',
                },
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: '0 20px 60px rgba(30, 64, 175, 0.3)',
                  '&::before': {
                    left: '100%',
                  }
                }
              }}>
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, position: 'relative', zIndex: 1 }}>Stealth AI Startup</Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 2, position: 'relative', zIndex: 1 }}>Co-founder & CTO • 2025 - Current</Typography>
                <Typography variant="body1" sx={{ mt: 1, color: 'white' }}>
                  <strong>Co-founder & Chief Technology Officer:</strong> Building an advanced AI platform in stealth mode. 
                  Leading development of cutting-edge AI technology focused on enterprise automation and optimization. 
                  More details coming soon.
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', color: 'rgba(255,255,255,0.9)' }}>
                  • Architecting revolutionary AI technology with enterprise-grade security<br/>
                  • Building scalable platform with modern infrastructure and compliance<br/>
                  • Developing AI solutions for industry-specific applications<br/>
                  • Leading technical vision for next-generation automation<br/>
                  • <strong>🚀 Public launch coming soon...</strong>
                </Typography>
              </Box>
              
              <Box sx={{ 
                p: 4, 
                borderRadius: 3,
                background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                color: 'white',
                boxShadow: '0 8px 32px rgba(15, 118, 110, 0.15)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.6s ease-in-out',
                  borderRadius: 'inherit',
                },
                '&:hover': {
                  transform: 'translateY(-6px) rotateY(5deg)',
                  boxShadow: '0 16px 48px rgba(15, 118, 110, 0.25)',
                  '&::after': {
                    transform: 'translateX(100%)',
                  }
                }
              }}>
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, position: 'relative', zIndex: 1 }}>Auxo Solutions → Alpha FMC</Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 2, position: 'relative', zIndex: 1 }}>Principal • 2023 - 2025 • Successful Exit</Typography>
                <Typography variant="body1" sx={{ mt: 1, color: 'rgba(255,255,255,0.9)' }}>
                  <strong>Successful Acquisition by Alpha FMC (June 2025):</strong> Key team member in enterprise technology consulting firm 
                  specializing in modern solutions, cloud, data and AI for financial services. Helped drive company to successful 
                  acquisition by leading global financial services consultancy Alpha FMC.
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', color: 'rgba(255,255,255,0.9)' }}>
                  • Delivered enterprise solutions to industry leaders in Insurance and Financial Services<br/>
                  • Led large enterprise programs, hiring and delivering teams of engineers<br/>
                  • Created strategic vision and roadmap for non-Unqork development initiatives<br/>
                  • Established offshore development programs for scalable delivery<br/>
                  • <strong>🎯 Successfully exited via acquisition by Alpha FMC, expanding their technology capabilities</strong>
                </Typography>
              </Box>
              
              <Box sx={{ 
                p: 4, 
                borderRadius: 3,
                background: 'linear-gradient(135deg, #334155 0%, #475569 100%)',
                color: 'white',
                boxShadow: '0 8px 32px rgba(51, 65, 85, 0.15)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.1), transparent)',
                  transform: 'rotate(0deg)',
                  transition: 'transform 0.8s ease-in-out',
                },
                '&:hover': {
                  transform: 'translateY(-6px) scale(1.01)',
                  boxShadow: '0 16px 48px rgba(51, 65, 85, 0.25)',
                  '&::before': {
                    transform: 'rotate(360deg)',
                  }
                }
              }}>
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, position: 'relative', zIndex: 1 }}>Foxo Technologies (NYSEAM: FOXO)</Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 2, position: 'relative', zIndex: 1 }}>Interim CEO & CTO • 2020 - 2023</Typography>
                <Typography variant="body1" sx={{ mt: 1, color: 'rgba(255,255,255,0.9)', position: 'relative', zIndex: 1 }}>
                  <strong>Interim Chief Executive Officer:</strong> Board-appointed replacement CEO for public company. 
                  Managed public company financials, SEC filings, and successfully navigated complex regulatory compliance. 
                  Led strategic company reset and completed successful shareholder meeting raising $750K in challenging market conditions.
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', color: 'rgba(255,255,255,0.8)', position: 'relative', zIndex: 1 }}>
                  • Built entire life insurance company software infrastructure from scratch to best-in-class in under one year<br/>
                  • Hired and managed technology teams of up to 50+ employees including executives<br/>
                  • Sold insurance company shell for $5M to maintain operations<br/>
                  • Navigated NYSE compliance issues and achieved successful shareholder approval
                </Typography>
              </Box>
              
              <Box sx={{ 
                p: 4, 
                borderRadius: 3,
                border: '1px solid #e2e8f0',
                backgroundColor: 'white',
                boxShadow: '0 2px 16px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, #1e40af, #0f766e)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.3s ease-out',
                },
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  borderColor: '#cbd5e1',
                  '&::after': {
                    transform: 'translateX(0)',
                  }
                }
              }}>
                <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600 }}>Cargill</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>Platform Product Owner / Principal Engineer • 2019 - 2020</Typography>
                <Typography variant="body1" sx={{ mt: 1, color: 'text.primary' }}>
                  Directed Engineering, DevOps, and QA for Digital Experience Platform. Designed platform structure, vision, and strategy 
                  while leading technology decisions and planning for enterprise-scale solutions.
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', color: 'text.secondary' }}>
                  • Grew DXP office from 5 developers to 70+ including 2 offshore offices<br/>
                  • Established comprehensive library of reusable software for global company applications<br/>
                  • Managed ~50 Engineers, Scrum Masters, Product Owners, and specialty roles
                </Typography>
              </Box>
              
              <Box sx={{ 
                p: 4, 
                borderRadius: 3,
                border: '1px solid #e2e8f0',
                backgroundColor: 'white',
                boxShadow: '0 2px 16px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-3px) scale(1.01)',
                  boxShadow: '0 8px 32px rgba(30, 64, 175, 0.1)',
                  borderColor: '#1e40af',
                  '& .company-title': {
                    color: '#1e40af',
                  }
                }
              }}>
                <Typography variant="h6" className="company-title" sx={{ color: 'text.primary', fontWeight: 600, transition: 'color 0.3s ease' }}>brightpeak financial / Thrivent</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>Architect / Tech Lead / Manager • 2015 - 2019</Typography>
                <Typography variant="body1" sx={{ mt: 1, color: 'text.primary' }}>
                  Originated Angular frontend and Serverless AWS backend architectures. Architected, designed, and developed 
                  Term/Disability/Savings products and applications, creating first-in-market direct-to-consumer solutions.
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', color: 'text.secondary' }}>
                  • Developed Alexa App solo in 3 days (2016) - first direct-to-consumer insurance market entry<br/>
                  • Created online direct-to-consumer disability insurance and mobile insurance app<br/>
                  • Led multiple teams building library of applications for life insurance, disability, and savings
                </Typography>
              </Box>
              
              <Box sx={{ 
                p: 4, 
                borderRadius: 3,
                border: '1px solid #e2e8f0',
                backgroundColor: 'white',
                boxShadow: '0 2px 16px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 32px rgba(15, 118, 110, 0.1)',
                  borderColor: '#0f766e',
                  backgroundColor: 'rgba(15, 118, 110, 0.02)',
                }
              }}>
                <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600 }}>4ROI / Assessment Systems</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>Application Developer (Lead) • 2013 - 2015</Typography>
                <Typography variant="body1" sx={{ mt: 1, color: 'text.primary' }}>
                  Architected, designed, and developed new certification product from scratch using AngularJS, Bootstrap, 
                  J2EE with Spring, Struts, and Hibernate. Led full-stack development and strategic project leadership.
                </Typography>
              </Box>
              
              <Box sx={{ 
                p: 4, 
                borderRadius: 3,
                border: '1px solid #e2e8f0',
                backgroundColor: 'white',
                boxShadow: '0 2px 16px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '0',
                  height: '0',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0, 102, 255, 0.05) 0%, transparent 70%)',
                  transform: 'translate(-50%, -50%)',
                  transition: 'all 0.4s ease-out',
                },
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  borderColor: '#cbd5e1',
                  '&::before': {
                    width: '120%',
                    height: '120%',
                  }
                }
              }}>
                <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600, position: 'relative', zIndex: 1 }}>Fishbowl Solutions</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, position: 'relative', zIndex: 1 }}>Software Consultant • 2011 - 2013</Typography>
                <Typography variant="body1" sx={{ mt: 1, color: 'text.primary' }}>
                  Delivered enterprise solutions to industry leaders including Wells Fargo, Toro, Alberta Blue Cross, 
                  and Kansas City Plant. Specialized in integrating technology and optimizing operations across diverse industries.
                </Typography>
              </Box>
              
              <Box sx={{ 
                p: 4, 
                borderRadius: 3,
                border: '1px solid #e2e8f0',
                backgroundColor: 'white',
                boxShadow: '0 2px 16px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-3px) rotateX(5deg)',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
                  borderColor: '#94a3b8',
                  transformOrigin: 'center bottom',
                }
              }}>
                <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600 }}>TeamQuest Corporation</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>Software Engineer • 2008 - 2010</Typography>
                <Typography variant="body1" sx={{ mt: 1, color: 'text.primary' }}>
                  Developed Regular Expression compiler and led initial UI/UX for new administration product. 
                  Built foundational software engineering skills and system analysis expertise.
                </Typography>
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Typography variant="h4" gutterBottom color="primary">
              Education
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ p: 3, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="h6" color="primary">University of Minnesota</Typography>
                <Typography variant="body2" color="text.secondary">Master of Science - Computer Science • 2016</Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Advanced studies in computer science and technology, focusing on software engineering principles, 
                  system design, and advanced programming methodologies. Completed entrepreneurship coursework at Carlson School.
                </Typography>
              </Box>
              
              <Box sx={{ p: 3, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="h6" color="primary">Luther College</Typography>
                <Typography variant="body2" color="text.secondary">Bachelor in Liberal Arts - Computer Science major, Math minor • 2008</Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Comprehensive undergraduate education providing strong analytical and problem-solving foundations. 
                  Computer Science major with Mathematics minor, developing both technical skills and critical thinking abilities.
                </Typography>
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value={value} index={2}>
            <Typography variant="h4" gutterBottom color="primary">
              Areas of Expertise
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              
              {/* Notable Achievements - Moved to Top */}
              <Box sx={{ 
                p: 4, 
                borderRadius: 3,
                background: 'linear-gradient(135deg, #1e40af 0%, #93c5fd 100%)',
                color: 'white',
                boxShadow: '0 8px 32px rgba(30, 64, 175, 0.15)',
              }}>
                <Typography variant="h5" sx={{ 
                  background: 'linear-gradient(135deg, #ffffff 0%, #1e40af 70%, #93c5fd 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 600, 
                  mb: 3 
                }}>
                  🏆 Notable Achievements
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
                  <Box>
                    <Typography variant="h6" sx={{ 
                      color: 'white', 
                      fontWeight: 600, 
                      mb: 1,
                      textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                    }}>AI Innovation</Typography>
                    <Typography variant="body2" sx={{ 
                      color: 'rgba(255,255,255,0.95)', 
                      mb: 1,
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                    }}>
                      • Co-founded stealth AI startup - details coming soon
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: 'rgba(255,255,255,0.95)', 
                      mb: 1,
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                    }}>
                      • Building revolutionary AI platform with enterprise-grade security
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: 'rgba(255,255,255,0.95)',
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                    }}>
                      • Creating cutting-edge automation solutions for enterprise clients
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="h6" sx={{ 
                      color: 'white', 
                      fontWeight: 600, 
                      mb: 1,
                      textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                    }}>Executive Leadership</Typography>
                    <Typography variant="body2" sx={{ 
                      color: 'rgba(255,255,255,0.95)', 
                      mb: 1,
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                    }}>
                      • Interim CEO of NYSE-listed public company (Foxo Technologies)
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: 'rgba(255,255,255,0.95)', 
                      mb: 1,
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                    }}>
                      • Successfully navigated SEC compliance and raised $750K
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: 'rgba(255,255,255,0.95)',
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                    }}>
                      • Key team member in successful acquisition by Alpha FMC
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="h6" sx={{ 
                      color: 'white', 
                      fontWeight: 600, 
                      mb: 1,
                      textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                    }}>Scale & Impact</Typography>
                    <Typography variant="body2" sx={{ 
                      color: 'rgba(255,255,255,0.95)', 
                      mb: 1,
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                    }}>
                      • Grew engineering teams from 5 to 70+ employees globally
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: 'rgba(255,255,255,0.95)', 
                      mb: 1,
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                    }}>
                      • Built enterprise insurance infrastructure in under one year
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: 'rgba(255,255,255,0.95)',
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                    }}>
                      • Developed Alexa insurance app in 3 days (first-in-market, 2016)
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box>
                <Typography variant="h6" color="primary" gutterBottom>
                  <Build sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Leadership & Management
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1, 
                  flexWrap: { xs: 'nowrap', md: 'wrap' },
                  overflowX: { xs: 'auto', md: 'visible' },
                  mb: 2,
                  pb: { xs: 1, md: 0 }
                }}>
                  <Chip label="Co-founder & CTO" color="primary" />
                  <Chip label="Executive Leadership (CEO/CTO)" color="primary" />
                  <Chip label="Team Management (50+ people)" color="primary" />
                  <Chip label="SEC Filings & Compliance" color="primary" />
                  <Chip label="Public Company Operations" color="primary" />
                  <Chip label="Strategic Planning" color="primary" />
                  <Chip label="Fundraising & Investor Relations" color="primary" />
                </Box>
              </Box>
              
              <Box>
                <Typography variant="h6" color="primary" gutterBottom>
                  <Psychology sx={{ mr: 1, verticalAlign: 'middle' }} />
                  AI & Machine Learning
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1, 
                  flexWrap: { xs: 'nowrap', md: 'wrap' },
                  overflowX: { xs: 'auto', md: 'visible' },
                  mb: 2,
                  pb: { xs: 1, md: 0 }
                }}>
                  <Chip label="AI Platform Architecture" color="secondary" />
                  <Chip label="Machine Learning Systems" color="secondary" />
                  <Chip label="AI Agent Development" color="secondary" />
                  <Chip label="Natural Language Processing" color="secondary" />
                  <Chip label="Insurance AI Solutions" color="secondary" />
                  <Chip label="Intelligent Automation" color="secondary" />
                </Box>
              </Box>
              
              <Box>
                <Typography variant="h6" color="primary" gutterBottom>
                  <Code sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Software & Systems Architecture
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1, 
                  flexWrap: { xs: 'nowrap', md: 'wrap' },
                  overflowX: { xs: 'auto', md: 'visible' },
                  mb: 2,
                  pb: { xs: 1, md: 0 }
                }}>
                  <Chip label="AI Platform Architecture" color="secondary" variant="outlined" />
                  <Chip label="Enterprise Architecture" color="secondary" variant="outlined" />
                  <Chip label="Angular & Frontend" color="secondary" variant="outlined" />
                  <Chip label="Serverless AWS" color="secondary" variant="outlined" />
                  <Chip label="J2EE / Spring" color="secondary" variant="outlined" />
                  <Chip label="DevOps & Cloud" color="secondary" variant="outlined" />
                  <Chip label="Security & Compliance" color="secondary" variant="outlined" />
                </Box>
              </Box>

              <Box>
                <Typography variant="h6" color="primary" gutterBottom>
                  <Psychology sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Business & Technology Integration
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1, 
                  flexWrap: { xs: 'nowrap', md: 'wrap' },
                  overflowX: { xs: 'auto', md: 'visible' },
                  mb: 2,
                  pb: { xs: 1, md: 0 }
                }}>
                  <Chip label="AI-Powered Insurance Solutions" color="primary" />
                  <Chip label="Financial Services & Fintech" color="primary" />
                  <Chip label="Insurance Technology" color="primary" />
                  <Chip label="Product Development" color="primary" />
                  <Chip label="Market Analysis" color="primary" />
                  <Chip label="Vendor Evaluation" color="primary" />
                  <Chip label="Process Optimization" color="primary" />
                </Box>
              </Box>

              <Box>
                <Typography variant="h6" color="primary" gutterBottom>
                  <Speed sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Core Technical Skills
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1, 
                  flexWrap: { xs: 'nowrap', md: 'wrap' },
                  overflowX: { xs: 'auto', md: 'visible' },
                  pb: { xs: 1, md: 0 }
                }}>
                  <Chip label="AngularJS/Angular" color="secondary" />
                  <Chip label="AWS Cloud Services" color="secondary" />
                  <Chip label="Spring/Hibernate" color="secondary" />
                  <Chip label="UI/UX Design" color="secondary" />
                  <Chip label="Regular Expressions" color="secondary" />
                  <Chip label="Bootstrap" color="secondary" />
                </Box>
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value={value} index={3}>
            <Typography variant="h4" gutterBottom color="primary">
              Projects & Ventures
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ p: 3, border: 3, borderColor: 'secondary.main', borderRadius: 2, bgcolor: 'secondary.light' }}>
                <Typography variant="h6" sx={{ color: 'white' }}>
                  Stealth AI Startup
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1 }}>
                  Co-founded • 2025 • Coming Soon
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, color: 'white' }}>
                  Revolutionary AI platform currently in stealth mode. Building cutting-edge automation technology 
                  focused on enterprise solutions. We're working on something exciting that will transform how 
                  businesses operate with intelligent AI agents and advanced automation.
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic', color: 'rgba(255,255,255,0.9)' }}>
                  🚀 "More details coming soon" - Featuring next-generation AI technology, 
                  enterprise-grade security, and industry-specific solutions.
                </Typography>
              </Box>
              
              <Box sx={{ p: 3, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="h6" color="primary">
                  <Link href="https://danielsonsunglasses.com" target="_blank" rel="noopener">
                    Danielson Sunglasses ↗
                  </Link>
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  E-commerce venture in the eyewear industry, featuring modern sunglasses with quality craftsmanship and contemporary design.
                </Typography>
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value={value} index={4}>
            <Typography variant="h4" gutterBottom color="primary">
              Leadership Philosophy
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              
              <Box sx={{ p: 4, borderRadius: 3, border: '1px solid #e2e8f0', backgroundColor: 'white' }}>
                <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
                  Strategic Vision & Execution Excellence
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Transformational leadership requires the ability to operate simultaneously at 30,000 feet and ground level. 
                  My methodology centers on rigorous scenario planning, data-driven decision architecture, and strategic patience 
                  balanced with tactical agility. I architect frameworks that enable teams to innovate within clear parameters 
                  while maintaining unwavering focus on measurable outcomes.
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, fontStyle: 'italic', color: 'text.secondary' }}>
                  "The best strategies emerge from the intersection of deep market understanding, technological possibility, and human psychology."
                </Typography>
              </Box>

              <Box sx={{ p: 4, borderRadius: 3, background: 'linear-gradient(135deg, #1e40af 0%, #93c5fd 100%)', color: 'white' }}>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                  Intellectual Capital & Adaptive Intelligence
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)' }}>
                  In an era where technological half-lives are measured in months, not years, executive success demands 
                  intellectual humility coupled with aggressive learning velocity. I maintain competitive advantage through 
                  systematic knowledge acquisition across disciplines—from behavioral economics to emerging AI paradigms—
                  synthesizing insights from diverse global markets and cross-cultural business environments.
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)' }}>
                  My approach includes deliberate exposure to cognitive dissonance through international markets, 
                  contrarian viewpoints, and interdisciplinary study. This intellectual portfolio diversification 
                  enables pattern recognition across seemingly unrelated domains and drives breakthrough strategic insights.
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', fontStyle: 'italic', fontSize: '0.95em' }}>
                  "True innovation emerges at the intersection of deep domain expertise and cross-pollinated thinking."
                </Typography>
              </Box>

              <Box sx={{ p: 4, borderRadius: 3, border: '1px solid #0f766e', backgroundColor: '#f0fdfa' }}>
                <Typography variant="h6" color="secondary" gutterBottom sx={{ fontWeight: 600 }}>
                  Human-Centered Leadership Architecture
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Sustainable organizational transformation is fundamentally a human challenge requiring psychological 
                  safety, authentic leadership presence, and systems thinking. My leadership philosophy is built on 
                  three interconnected pillars that create multiplicative rather than additive value:
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>
                    🎯 Trust Architecture & Psychological Safety
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, pl: 2 }}>
                    Leadership credibility is earned through consistent micro-behaviors, radical transparency in decision-making, 
                    and genuine investment in individual growth trajectories. I create environments where calculated risks 
                    are rewarded and intelligent failures become learning accelerators.
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>
                    💎 Antifragile Resilience & Growth Mindset
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, pl: 2 }}>
                    Having navigated significant personal and professional adversity, I understand that elite performance 
                    emerges from embracing volatility as a growth catalyst. I develop organizational antibodies against 
                    black swan events while maintaining optionality for asymmetric upside opportunities.
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>
                    ⚡ Sustainable High Performance & Systems Integration
                  </Typography>
                  <Typography variant="body1" sx={{ pl: 2 }}>
                    Peak cognitive performance requires understanding energy management, circadian optimization, and 
                    work-life integration rather than balance. I model sustainable intensity while maintaining the 
                    strategic perspective necessary for long-term value creation.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </TabPanel>
        </Paper>

        {/* Footer */}
        <Box sx={{ mt: 4, py: 3, textAlign: 'center', borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary">
            © 2025 Tyler Scott Danielson. Built with React, TypeScript, and Material-UI.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
