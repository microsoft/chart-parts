import { Path } from "d3-path";
import { SGMark, SGShapeItem, MarkType } from "@gog/mark-interfaces";
import { VSvgNode } from "@gog/vdom-interfaces";
import { MarkPrerenderer } from "@gog/xform-sg-interfaces";
import { assertTypeIs } from "./util";
import { VSvgMarkConverter } from "./interfaces";

export class ShapeRenderer implements VSvgMarkConverter {
  public static TARGET_MARK_TYPE = MarkType.Shape;

  public render(mark: SGMark<SGShapeItem>) {
    assertTypeIs(mark, ShapeRenderer.TARGET_MARK_TYPE);
    // TODO
    return { nodes: [] };
  }
}
