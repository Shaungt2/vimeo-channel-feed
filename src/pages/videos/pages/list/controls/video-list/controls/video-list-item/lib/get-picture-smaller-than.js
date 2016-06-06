import Immutable from "immutable";

export default function getPictureSmallerThan(maxWidth, pictures) {

    return pictures.reduce(
        (result, curPicture) =>
            curPicture.get("width") > result.get("width")
            && curPicture.get("width") <= maxWidth ?
                curPicture :
                result,

        Immutable.Map({ width: 0 }) // eslint-disable-line babel/new-cap
    );
}
