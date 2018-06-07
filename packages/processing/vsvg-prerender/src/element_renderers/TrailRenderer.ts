import { Path } from "d3-path";
import { SGMark, SGTrailItem, MarkType } from "@gog/mark-interfaces";
import { VSvgNode } from "@gog/vdom-interfaces";
import { MarkPrerenderer } from "@gog/xform-sg-interfaces";
import { assertTypeIs } from "./util";
import { VSvgMarkConverter } from "./interfaces";

export class TrailRenderer implements VSvgMarkConverter {
  public static TARGET_MARK_TYPE = MarkType.Trail;

  public render(mark: SGMark<SGTrailItem>) {
    assertTypeIs(mark, TrailRenderer.TARGET_MARK_TYPE);
    // TODO
    return { nodes: [] };
  }
}
