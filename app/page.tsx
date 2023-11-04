import FastRenameButton from "./fast-rename-button";

const Home = async () => {
  const data = await fetch(
    "https://app.cloudpano.com/api/tours/demo?isViewer=true"
  ).then((response) => {
    if (!response) {
      console.error("Error fetching images");
    } else {
      return response.json();
    }
  });

  let images;

  if (data) {
    images = JSON.parse(data.images);
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      {images && <FastRenameButton images={images} />}
    </main>
  );
};

export default Home;
