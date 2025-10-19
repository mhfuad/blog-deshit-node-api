import paginationConfig from '../config/pagination.js';

const { defaultPage, defaultLimit, maxLimit } = paginationConfig;

class APIFeatures {
    constructor(query) {
        this.query = query;
        this.page = parseInt(query.page) || defaultPage;
        this.limit = parseInt(query.limit) || defaultLimit;

        this.limit = Math.min(this.limit, maxLimit);

        this.skip = (this.page - 1) * this.limit;
        this.sort = query.sort ? this._parseSort(query.sort) : { createdAt: -1 };
    }

    _parseSort(sortString) {
        const sort = {};
        sortString.split(',').forEach(field => {
            if (field.startsWith('-')) {
                sort[field.substring(1)] = -1;
            } else {
                sort[field] = 1;
            }
        });
        return sort;
    }

    getPaginationParams() {
        return {
            page: this.page,
            limit: this.limit,
            skip: this.skip,
            sort: this.sort,
        };
    }
}

export default APIFeatures;