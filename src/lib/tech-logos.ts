export type TechLogoConfig = {
  slug: string;
  color: string;
};

export const techLogos: Record<string, TechLogoConfig> = {
  Excel: { slug: "microsoftexcel", color: "217346" },
  SQL: { slug: "postgresql", color: "4169E1" },
  Python: { slug: "python", color: "3776AB" },
  Statistics: { slug: "scikitlearn", color: "F7931E" },
  "Data Cleaning": { slug: "pandas", color: "150458" },
  PostgreSQL: { slug: "postgresql", color: "4169E1" },
  FastAPI: { slug: "fastapi", color: "009688" },
  "REST APIs": { slug: "openapiinitiative", color: "6BA539" },
  HTML: { slug: "html5", color: "E34F26" },
  JavaScript: { slug: "javascript", color: "F7DF1E" },
  React: { slug: "react", color: "61DAFB" },
  Git: { slug: "git", color: "F05032" },
  GitHub: { slug: "github", color: "181717" },
  Postman: { slug: "postman", color: "FF6C37" },
  "Next.js": { slug: "nextdotjs", color: "000000" },
  "Node.js": { slug: "nodedotjs", color: "339933" },
  Prisma: { slug: "prisma", color: "2D3748" },
  TypeScript: { slug: "typescript", color: "3178C6" },
  Forecasting: { slug: "plotly", color: "3F4F75" },
};

export function getTechLogoUrl(name: string): string | null {
  const localLogos: Record<string, string> = {
    "Excel": "/portfolio/logo/EXCEL.svg",
    "CSS": "/portfolio/logo/CSS.svg",
    "Power BI": "/portfolio/logo/POWER BI.svg",
    "VS Code": "/portfolio/logo/VS CODE.svg",
  };

  if (localLogos[name]) {
    return localLogos[name];
  }

  const config = techLogos[name];
  if (!config) return null;
  return `https://cdn.simpleicons.org/${config.slug}/${config.color}`;
}
