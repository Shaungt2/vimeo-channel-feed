export default function filterVideosWithDescription(videos, filter) {

    const filteredDescription = filter
        .get("description")
        .toLowerCase();

    if (!filteredDescription) {
        return videos;
    }

    return videos.filter(video => {

        const videoDescription = video.get("description");

        return videoDescription && videoDescription
            .toLowerCase()
            .includes(filteredDescription);
    });
}
