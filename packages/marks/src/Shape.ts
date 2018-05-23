// TODO
/**
 * Shape marks are arbitrary shapes whose geometry is determined at render time.
 * Whereas path marks require SVG path strings, shape marks instead require a shape instance
 * with a drawing function that is later invoked upon render. Canvas rendering with shape marks
 * can improve performance, as no intermediate representation (such as an SVG path string)
 * needs to be parsed.
 */
