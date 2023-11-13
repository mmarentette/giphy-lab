export default function GifDetails({gif}) {
    console.log(gif);
    return (
        <img src={gif.images.original.url} />
    );
}