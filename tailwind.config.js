module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Refined neutral palette
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
        // Sophisticated accent color
        accent: {
          50: "#eef2f9", // very light blue
          100: "#d3dcf0",
          200: "#a6b8e1",
          300: "#7a94d1",
          400: "#4e70c1",
          500: "#053588", // your main blue
          600: "#042e76", // darker shade for hover/active
          700: "#03245d",
          800: "#021a44",
          900: "#01102b",
          950: "#000817",
        },
        // Refined grays for better contrast
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      fontFamily: {
        // Montserrat font
        'montserrat': ['Montserrat', 'system-ui', 'sans-serif'],
        // Default fonts - all using Montserrat now
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        subtle:
          "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        soft: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        elegant:
          "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)",
        custom: "0px 11.37px 22.74px 0px #00000026",
        nav: "0px 7.5px 138.67px 37.48px #E3A4552B"
      },
      animation: {
        'slideUpFadeIn': 'slideUpFadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        slideUpFadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      backgroundImage: {
        'golden-gradient': 'conic-gradient(from 167.85deg at 75.81% -16.57%, #EEBC70 -21.72deg, #E3A455 26.25deg, #FFEBC4 156.58deg, #D0A068 261.59deg, #EEBC70 338.28deg, #E3A455 386.25deg)',
      },
      textColor: {
        'gradient-golden': 'transparent',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.neutral.700'),
            '--tw-prose-headings': theme('colors.neutral.900'),
            '--tw-prose-lead': theme('colors.neutral.600'),
            '--tw-prose-links': theme('colors.accent.600'),
            '--tw-prose-bold': theme('colors.neutral.900'),
            '--tw-prose-counters': theme('colors.neutral.500'),
            '--tw-prose-bullets': theme('colors.neutral.300'),
            '--tw-prose-hr': theme('colors.neutral.200'),
            '--tw-prose-quotes': theme('colors.neutral.900'),
            '--tw-prose-quote-borders': theme('colors.neutral.200'),
            '--tw-prose-captions': theme('colors.neutral.500'),
            '--tw-prose-code': theme('colors.neutral.900'),
            '--tw-prose-pre-code': theme('colors.neutral.100'),
            '--tw-prose-pre-bg': theme('colors.neutral.900'),
            '--tw-prose-th-borders': theme('colors.neutral.300'),
            '--tw-prose-td-borders': theme('colors.neutral.200'),
            maxWidth: 'none',
            fontSize: theme('fontSize.base[0]'),
            lineHeight: theme('fontSize.base[1].lineHeight'),
            h1: {
              fontSize: theme('fontSize.3xl[0]'),
              lineHeight: theme('fontSize.3xl[1].lineHeight'),
              fontWeight: theme('fontWeight.bold'),
              marginBottom: theme('spacing.6'),
              marginTop: theme('spacing.12'),
            },
            h2: {
              fontSize: theme('fontSize.2xl[0]'),
              lineHeight: theme('fontSize.2xl[1].lineHeight'),
              fontWeight: theme('fontWeight.semibold'),
              marginBottom: theme('spacing.4'),
              marginTop: theme('spacing.10'),
            },
            h3: {
              fontSize: theme('fontSize.xl[0]'),
              lineHeight: theme('fontSize.xl[1].lineHeight'),
              fontWeight: theme('fontWeight.semibold'),
              marginBottom: theme('spacing.3'),
              marginTop: theme('spacing.8'),
            },
            p: {
              marginBottom: theme('spacing.6'),
              lineHeight: '1.75',
            },
            img: {
              borderRadius: theme('borderRadius.lg'),
              marginBottom: theme('spacing.6'),
              marginTop: theme('spacing.6'),
            },
            blockquote: {
              borderLeftWidth: '4px',
              borderLeftColor: theme('colors.accent.200'),
              backgroundColor: theme('colors.neutral.50'),
              padding: theme('spacing.6'),
              borderRadius: theme('borderRadius.lg'),
              fontStyle: 'italic',
              marginBottom: theme('spacing.6'),
              marginTop: theme('spacing.6'),
            },
            ul: {
              marginBottom: theme('spacing.6'),
              paddingLeft: theme('spacing.6'),
            },
            ol: {
              marginBottom: theme('spacing.6'),
              paddingLeft: theme('spacing.6'),
            },
            li: {
              marginBottom: theme('spacing.2'),
            },
            'code:not(pre code)': {
              backgroundColor: theme('colors.neutral.100'),
              color: theme('colors.accent.700'),
              fontSize: theme('fontSize.sm[0]'),
              fontWeight: theme('fontWeight.medium'),
              padding: `${theme('spacing.1')} ${theme('spacing.2')}`,
              borderRadius: theme('borderRadius.md'),
            },
            pre: {
              backgroundColor: theme('colors.neutral.900'),
              borderRadius: theme('borderRadius.lg'),
              padding: theme('spacing.6'),
              marginBottom: theme('spacing.6'),
              marginTop: theme('spacing.6'),
              overflowX: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: theme('colors.neutral.100'),
              fontSize: theme('fontSize.sm[0]'),
              fontWeight: 'inherit',
              padding: '0',
            },
            a: {
              textDecoration: 'none',
              fontWeight: theme('fontWeight.medium'),
              '&:hover': {
                color: theme('colors.accent.700'),
                textDecoration: 'underline',
              },
            },
          },
        },
        lg: {
          css: {
            fontSize: theme('fontSize.lg[0]'),
            lineHeight: theme('fontSize.lg[1].lineHeight'),
            h1: {
              fontSize: theme('fontSize.4xl[0]'),
              lineHeight: theme('fontSize.4xl[1].lineHeight'),
            },
            h2: {
              fontSize: theme('fontSize.3xl[0]'),
              lineHeight: theme('fontSize.3xl[1].lineHeight'),
            },
            h3: {
              fontSize: theme('fontSize.2xl[0]'),
              lineHeight: theme('fontSize.2xl[1].lineHeight'),
            },
            p: {
              marginBottom: theme('spacing.8'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
