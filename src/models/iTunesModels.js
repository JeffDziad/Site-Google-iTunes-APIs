const TYPES = {
    TRACK: {
        id: 0,
        str: "Track"
    },
    ALBUM: {
        id: 1,
        str: "Album"
    },
    AUDIOBOOK: {
        id: 2,
        str: "Audiobook"
    }
}

export class MediaCollection {
    constructor(raw) {
        //! Rethink this...
        this.tracks = [];
        this.albums = [];
        this.audiobooks = [];

        this.raw = {}
        if (raw) {
            console.log("Raw");
            this.raw = raw;
            this.resultCount = this.raw.resultCount;
            this.populate();

        }
    }
    populate() {
        for (let i = 0; i < this.raw.results.length; i++) {
            let item = this.raw.results[i];
            //! Dont like this...
            switch (item.wrapperType) {
                case "track":
                    this.add(new Track(item.artistId, item.artistName, item.trackName, item.previewUrl, item.artworkUrl100, item.releaseDate));
                    break;
                case "collection":
                    if (item.collectionType === "Album") {
                        this.add(new Album(item.artistId, item.artistName, item.collectionName, item.artworkUrl100, item.trackCount, item.releaseDate));
                    }
                    break;
                case "audiobook":
                    this.add(new Audiobook(item.artistId, item.artistName, item.collectionName, item.artworkUrl100, item.description, item.previewUrl));
                    break;
                default: break;
            }
        }

    }
    add(item) {
        //! Or this...
        switch (item.type.str) {
            case "Track":
                this.tracks.push(new Media(item));
                break;
            case "Album":
                this.albums.push(new Media(item));
                break;
            case "Audiobook":
                this.audiobooks.push(new Media(item));
                break;
        }
    }
    getItems() {
        return {
            tracks: this.tracks,
            albums: this.albums,
            audiobooks: this.audiobooks
        }
    }
}

class Media {
    constructor(item) {
        this.item = item;
    }
}

class Track {
    constructor(artistId, artistName, trackName, previewUrl, artworkUrl100, releaseDate) {
        this.type = TYPES.TRACK;

        this.artistId = artistId;
        this.artistName = artistName;
        this.trackName = trackName;
        this.previewUrl = previewUrl;
        this.artworkUrl100 = artworkUrl100;
        this.releaseDate = releaseDate;
    }
}

class Album {
    constructor(artistId, artistName, collectionName, artworkUrl100, trackCount, releaseDate) {
        this.type = TYPES.ALBUM;

        this.artistId = artistId;
        this.artistName = artistName;
        this.collectionName = collectionName;
        this.artworkUrl100 = artworkUrl100;
        this.trackCount = trackCount;
        this.releaseDate = releaseDate;
    }
}

class Audiobook {
    constructor(artistId, artistName, collectionName, artworkUrl100, description, previewUrl) {
        this.type = TYPES.AUDIOBOOK

        this.artistId = artistId;
        this.artistName = artistName;
        this.collectionName = collectionName;
        this.artworkUrl100 = artworkUrl100;
        this.description = description;
        this.previewUrl = previewUrl;
    }
}