#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
C3GaugeChart <- function(dataset, colors, width = NULL, height = NULL, elementId = NULL) {
  
  # forward options using x
  x = list(
    dataset  = dataset,
    colors   = colors
  )
  
  # create widget
  htmlwidgets::createWidget(
    name = 'C3GaugeChart',
    x,
    width = width,
    height = height,
    package = 'C3',
    elementId = elementId
  )
}

#' Shiny bindings for C3GaugeChart
#'
#' Output and render functions for using C3GaugeChart within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a C3GaugeChart
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name C3GaugeChart-shiny
#'
#' @export
C3GaugeChartOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'C3GaugeChart', width, height, package = 'C3')
}

#' @rdname C3GaugeChart-shiny
#' @export
renderC3GaugeChart <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, C3GaugeChartOutput, env, quoted = TRUE)
}
