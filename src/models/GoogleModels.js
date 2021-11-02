const TYPE = {
    BOOK: {
        id: 0,
        str: "Book",
    },
};

export const maxResults = 40;

export class LibraryCollection {
    constructor(data, searchTerm) {
        this.searchTerm = searchTerm;
        this.items = [];
        if (data) {
            this.raw = data;
            this.populate();
        } else {
            this.raw = null;
        }
    }
    //? Builds this.items from passed in array
    populate() {
        for (let i = 0; i < this.raw.items.length; i++) {
            let x = this.raw.items[i];
            if (x.volumeInfo.imageLinks) {
                this.items.push(
                    new LibraryItem(
                        new Book(
                            x.id,
                            x.volumeInfo.title,
                            x.volumeInfo.imageLinks.thumbnail,
                            x.volumeInfo.description,
                            x.volumeInfo.publishedDate,
                            x.volumeInfo.authors
                        )
                    ),
                );
            }
        }
    }
    getObject() {
        let obj = {
            array: [],
            total: 0,
            maxResults: maxResults,
            searchTerm: this.searchTerm
        }
        if (this.raw) {
            obj.array = this.items;
            obj.total = this.raw.totalItems;
        }
        return obj;
    }
}

//! Add functionality to add and remove movies from cart
class LibraryItem {
    constructor(media) {
        this.media = media;
    }
}

class Book {
    constructor(
        id,
        title,
        thumbnail = "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg",
        description,
        publishDate,
        authors = "No author available."
    ) {
        this.type = TYPE.BOOK;

        this.id = id;
        this.title = title;
        //TODO: Set default image
        this.thumbnail = thumbnail;
        this.description = description;
        this.publishDate = publishDate;
        this.authors = authors;
    }
}