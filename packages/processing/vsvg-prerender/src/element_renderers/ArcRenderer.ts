import { Path } from "d3-path";
import { SGMark, SGArcItem, MarkType } from "@gog/mark-interfaces";
import { VSvgNode, VSvgTransformType } from "@gog/vdom-interfaces";
import { emitMarkGroup, commonProps, assertTypeIs } from "./util";
import { arc } from "../path";
import { MarkPrerenderer } from "@gog/xform-sg-interfaces";
import { VSvgMarkConverter, translate } from "./interfaces";

export class ArcRenderer implements VSvgMarkConverter {
  public static TARGET_MARK_TYPE = MarkType.Arc;

  public render(mark: SGMark<SGArcItem>) {
    assertTypeIs(mark, ArcRenderer.TARGET_MARK_TYPE);

    const nodes = emitMarkGroup(
      MarkType.Arc,
      mark.role,
      mark.items.map(item => {
        const { x = 0, y = 0 } = item;
        const result: VSvgNode = {
          type: "path",
          attrs: {
            ...commonProps(item),
            d: arc(item, null).toString()
          },
          transforms: [translate(x, y)]
        };
        return result;
      })
    );
    return { nodes };
  }
}
