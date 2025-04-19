import { Transform } from 'class-transformer';
import { JsonObject, JsonProperty } from 'typescript-json-serializer';

@JsonObject()
export abstract class EntityImmutable {
  @JsonProperty()
  private id: string;

  @JsonProperty({
    beforeDeserialize: (property) => new Date(property).toISOString(),
    beforeSerialize: (property: Date) => property?.getTime()
  })
  @Transform(({ value }) => value?.getTime(), { toPlainOnly: true })
  private createdAtUtc: Date;

  constructor(params: { id?: string; createdAtUtc?: Date }) {
    if (!params) return;
    this.setId(params?.id);
    this.createdAtUtc = params?.createdAtUtc ?? new Date();
  }

  public setId(id: string) {
    this.id = id ?? crypto.randomUUID();
  }

  public getId(): string {
    return this.id;
  }

  public getCreatedAtUtc(): Date {
    return this.createdAtUtc;
  }

  public setCreatedAtUtc(createdInUtc: Date): void {
    this.createdAtUtc = createdInUtc;
  }
}
