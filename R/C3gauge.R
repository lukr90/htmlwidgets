#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
C3Gauge <- function(message, width = NULL, height = NULL) {
  
  # forward options using x
  x = list(
    data = message
  )
  
  # create widget
  htmlwidgets::createWidget(
    name = 'C3Gauge',
    x,
    width = width,
    height = height,
    package = 'C3'
  )
}