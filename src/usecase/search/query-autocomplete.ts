import { Client } from '@elastic/elasticsearch';
import { ElasticsearchService } from 'src/infrastructure/config/elasticsearch/elasticsearch.service';

export class QueryAutocompleteUsecase {
  client: Client;

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async execute(q: string) {
    function mapFunc(record: any) {
      return {
        id: record._id,
        source: record._source,
        highlight: record.highlight,
      };
    }

    if (this.client === undefined) {
      this.client = this.elasticsearchService.getESClient();
    }

    const result = await this.client.search({
      index: 'videosearch',
      body: {
        query: {
          bool: {
            must: [
              {
                match: {
                  'title.ngram': {
                    query: q,
                  },
                },
              },
            ],
            should: [
              {
                match: {
                  'title.jaso': {
                    query: q,
                  },
                },
              },
            ],
          },
        },
      },
    });

    return result.body.hits.hits.map((record) => {
      return mapFunc(record);
    });
  }
}
