
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";

// This is a generic page template for various content pages
const PageDetail = () => {
  const { pageSlug } = useParams<{ pageSlug: string }>();
  
  // In a real app, fetch content based on pageSlug
  const pageData = {
    title: pageSlug ? pageSlug.replace(/-/g, ' ') : 'Page Detail',
    content: `This is a detailed page about ${pageSlug ? pageSlug.replace(/-/g, ' ') : 'our content'}. In a real application, this would be fetched from a database or CMS based on the page slug.`,
    sections: [
      {
        title: 'Section One',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at nisi ut nunc commodo lacinia. Cras in ultrices dui. Fusce at rutrum justo, vel tempus eros.'
      },
      {
        title: 'Section Two',
        content: 'Proin tempor felis nec risus iaculis, at dapibus nunc sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec sagittis eros eget magna imperdiet, vel iaculis velit dignissim.'
      },
      {
        title: 'Section Three',
        content: 'Etiam eget metus vitae massa efficitur imperdiet. Maecenas vel elementum ante. Duis placerat tincidunt nisi, nec aliquet risus ultrices eget. Morbi condimentum porta urna, nec lobortis enim finibus non.'
      }
    ]
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <div className="container-full py-4 px-4 md:px-6 lg:px-8">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/pages">Pages</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{pageData.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="container-content py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 capitalize">{pageData.title}</h1>
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {pageData.content}
              </p>
            </div>
            
            <div className="space-y-8 mt-8">
              {pageData.sections.map((section, index) => (
                <Card key={index} className="shadow-sm">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                    <p className="text-muted-foreground">{section.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PageDetail;
