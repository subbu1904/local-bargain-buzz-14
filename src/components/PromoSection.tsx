
import { Button } from "@/components/ui/button";

const PromoSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-[#006a5a]">Start selling your items today!</h2>
            <p className="text-lg mb-6 text-gray-600">
              Join thousands of people buying and selling in your area. 
              Flipssi makes it easy to turn your unused items into cash.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-[#006a5a] hover:bg-[#80ffeb] hover:text-[#006a5a] text-white">
                Start Selling
              </Button>
              <Button variant="outline" className="border-[#80ffeb] text-[#006a5a] hover:bg-[#bffff5]">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video bg-gradient-to-r from-[#006a5a] to-[#80ffeb] rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
              <div className="text-white text-center px-6">
                <div className="text-4xl font-bold mb-2">$0</div>
                <div className="text-xl mb-4">No listing fees</div>
                <p className="opacity-90">
                  Post as many items as you want for free. 
                  Only pay when you sell.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 w-48">
              <div className="text-sm font-medium text-gray-500 mb-1">Average sale time</div>
              <div className="text-2xl font-bold text-[#006a5a]">24 hours</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
