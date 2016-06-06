export default function filterVideosWithMinLikes(videos, filter) {

    const filteredMinLikes = filter.get("minLikes");

    if (!filteredMinLikes) {
        return videos;
    }

    return videos.filter(video => video.getIn([
        "metadata",
        "connections",
        "likes",
        "total"
    ]) >= filteredMinLikes);
}
