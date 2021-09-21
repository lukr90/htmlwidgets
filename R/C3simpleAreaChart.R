#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
C3simpleAreaChart <- function(dataset, colors, width = NULL, height = NULL, elementId = NULL) {
  
  # forward options using x
  x = list(
    dataset  = dataset,
    colors   = colors
  )
  
  # create widget
  htmlwidgets::createWidget(
    name = 'C3simpleAreaChart',
    x,
    width = width,
    height = height,
    package = 'C3',
    elementId = elementId
  )
}

#' Shiny bindings for C3simpleAreaChart
#'
#' Output and render functions for using C3simpleAreaChart within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a C3simpleAreaChart
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name C3simpleAreaChart-shiny
#'
#' @export
C3simpleAreaChartOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'C3simpleAreaChart', width, height, package = 'C3')
}

#' @rdname C3simpleAreaChart-shiny
#' @export
renderC3simpleAreaChart <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, C3AreaChart_intOutput, env, quoted = TRUE)
}
