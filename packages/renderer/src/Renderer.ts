import { Mark, SceneGraph } from '@gog/marks'
import { Observable, BehaviorSubject } from 'rxjs'
import { ChartOptions } from './ChartOptions'

/**
 * Create a new Renderer instance.
 * @param {object} [loader] - Optional loader instance for
 *   image and href URL sanitization. If not specified, a
 *   standard loader instance will be generated.
 * @constructor
 */
export abstract class Renderer<Container, RenderOutput> {
	private prevOptions: ChartOptions
	private prevScene: SceneGraph
	private initialRenderOccured: boolean = false

	/**
	 * Initialize a new Renderer instance.
	 * @param {DOMElement} container - The containing DOM element for the display.
	 * @param {Array<number>} origin - The origin of the display, in pixels.
	 *   The coordinate system will be translated to this point.
	 * @param {number} [scaleFactor=1] - Optional scaleFactor by which to multiply
	 *   the width and height to determine the final pixel size.
	 * @return {Renderer} - This renderer instance.
	 */
	constructor(
		protected readonly container: Container,
		sceneGraph: BehaviorSubject<SceneGraph>,
		chartOptions: BehaviorSubject<ChartOptions>,
	) {
		this.prevOptions = chartOptions.value
		this.prevScene = sceneGraph.value

		// Handle chart changes
		chartOptions.subscribe(nextOptions => {
			if (this.initialRenderOccured) {
				const prevOptions = this.prevOptions
				const scene = this.prevScene
				this.onChartOptionsChanged(nextOptions, prevOptions, scene)
				this.prevOptions = nextOptions
			}
		})

		// Handle scene-graph changes
		sceneGraph.subscribe(nextScene => {
			if (this.initialRenderOccured) {
				const prevScene = this.prevScene
				const options = this.prevOptions
				this.onSceneGraphChanged(nextScene, prevScene, options)
				this.prevScene = nextScene
			}
		})
	}

	/**
	 * Public API to invoke a render manually.
	 */
	public render(): Promise<RenderOutput> {
		this.initialRenderOccured = true
		return this.renderScene(this.prevScene, this.prevOptions)
	}

	/**
	 * Perform the rendering of the scene-graph
	 * @param scene The scenegraph to render
	 * @param options The chart options to render with
	 */
	protected abstract renderScene(
		scene: SceneGraph,
		options: ChartOptions,
	): Promise<RenderOutput>

	/**
	 * Render an input scenegraph, potentially with a set of dirty items.
	 * This method will perform an immediate rendering with available resources.
	 * The renderer may also need to perform image loading to perform a complete
	 * render. This process can lead to asynchronous re-rendering of the scene
	 * after this method returns. To receive notification when rendering is
	 * complete, use the renderAsync method instead.
	 * @param {object} nextScene - The scenegraph to render.
	 * @param {object} prevScene - The previously rendered scenegraph
	 * @return {Renderer} - A promise that indicates when the rendering is complete
	 */
	protected abstract onSceneGraphChanged(
		nextScene: SceneGraph,
		prevScene: SceneGraph,
		options: ChartOptions,
	): Promise<void>

	/**
	 * Rerender the chart with new dimensions
	 * @param dimensions The new dimensions
	 */
	protected abstract onChartOptionsChanged(
		nextOptions: ChartOptions,
		prevOptions: ChartOptions,
		scene: SceneGraph,
	): Promise<void>
}
