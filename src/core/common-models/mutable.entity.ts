import { Transform } from 'class-transformer';
import { EntityImmutable } from './immutable.entity';
import { JsonObject, JsonProperty } from 'typescript-json-serializer';

@JsonObject()
export class EntityMutable extends EntityImmutable {
  @JsonProperty({
    beforeDeserialize: (property) => new Date(property).toISOString(),
    beforeSerialize: (property: Date) => property?.getTime(),
  })
  @Transform(({ value }) => value?.getTime(), { toPlainOnly: true })
  private updatedAtUtc?: Date;

  constructor(params: {
    id?: string;
    createdAtUtc?: Date;
    updatedAtUtc?: Date;
  }) {
    super(params);
    if (!params) return;
    this.setUpdatedAtUtc(params?.updatedAtUtc);
    this.setId(params?.id);
  }

  public getUpdatedAtUtc(): Date {
    return this.updatedAtUtc;
  }

  public setUpdatedAtUtc(updatedAtUtc: Date) {
    this.updatedAtUtc = updatedAtUtc;
  }

  public update() {
    this.setUpdatedAtUtc(new Date());
  }
}
