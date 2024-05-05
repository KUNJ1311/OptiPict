const page = (props) => {
	return <div>${props.data}</div>;
};

export async function getServerSideProps(context) {
	try {
		const response = await fetch("http://localhost:3000/api/hello");
		const data = await response.json();
		return {
			props: { data: { data } },
		};
	} catch (error) {
		console.log(error);
		return {
			props: { data: {} },
		};
	}
}
export default page;
