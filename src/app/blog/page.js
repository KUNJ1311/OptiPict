const page = async () => {
	const data = await getData();
	return <div>{data}</div>;
};

export async function getData() {
	try {
		const response = await fetch("http://localhost:3000/api/hello");
		const data = await response.json();
		if (data.status === "ok") {
			return data.message;
		} else {
			return { message: "failed to fetch data" };
		}
	} catch (error) {
		console.log(error);
	}
}
export default page;
