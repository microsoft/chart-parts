import { Path } from "d3-path";
import { SGMark, SGImageItem, MarkType } from "@gog/mark-interfaces";
import { VSvgNode } from "@gog/vdom-interfaces";
import { assertTypeIs } from "./util";
import { MarkPrerenderer } from "@gog/xform-sg-interfaces";
import { VSvgMarkConverter } from "./interfaces";

export class ImageRenderer implements VSvgMarkConverter {
  public static TARGET_MARK_TYPE = MarkType.Image;

  public render(mark: SGMark<SGImageItem>) {
    assertTypeIs(mark, ImageRenderer.TARGET_MARK_TYPE);
    // TODO
    return { nodes: [] };
  }
}
