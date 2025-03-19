import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
	// link: https://images.unsplash.com/photo-1723999817243-e18f2904b140?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
	{ href: "/pulses-grains", name: "Pulses & Grains", imageUrl: "/pulses-grains.jpg" },
	// link: https://unsplash.com/photos/brown-cookies-on-white-textile-HuzdnhOfTKs
	{ href: "/snacks-biscuits", name: "Snacks & Biscuits", imageUrl: "/snacks-biscuits.jpg" },
	// link: https://unsplash.com/photos/pink-and-brown-makeup-brush-set-xwM61TPMlYk
	{ href: "/personal-care", name: "Personal Care", imageUrl: "/personal-care.jpg" },
	// link: https://unsplash.com/photos/grey-spoon-lot-V0xp-dTS3z0
	{ href: "/spices-masalas", name: "Spices & Masalas", imageUrl: "/spices-masalas.jpg" },
	// link: https://unsplash.com/photos/blue-and-white-casserole-near-olive-oil-bottle-on-table-zVNCNzQg30s
	{ href: "/cooking-essentials", name: "Cooking Essentials", imageUrl: "/cooking-essentials.jpg" },
	// link: https://unsplash.com/photos/gatorade-plastic-bottle-on-white-table-y2ZnTVlTo8E
	{ href: "/beverages", name: "Beverages", imageUrl: "/beverages.jpg" },
	// link: https://unsplash.com/photos/baked-bread-and-black-glass-of-milk-3oxa_NIv6Jg
	{ href: "/dairy-bakery", name: "Dairy & Bakery", imageUrl: "/dairy-bakery.jpg" },
];


const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>
					Explore Our Categories
				</h1>
				<p className='text-center text-xl text-gray-300 mb-12'>
					From Daal to Detergent – We’ve Got It All!
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

				{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
			</div>
		</div>
	);
};
export default HomePage;
